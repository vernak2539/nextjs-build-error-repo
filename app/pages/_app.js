import NextApp from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import storeProvider from '../utils/storeProvider';

class App extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    const { req, asPath } = ctx;
    const isServer = Boolean(req);
    const props = {
      initialState: null,
      isServer,
    };

    if (typeof Component.initializeI18n === 'function') {
      props.translations = Component.initializeI18n(ctx);
    }

    /**
     * If a page provides a getInitialProps function it implies
     * that it doesn't want to be wrapped in redux or the like so we
     * revert to the normal next behaviour of just calling getInitialProps
     * and then passing the return value on to our page.
     */
    if (typeof Component.getInitialProps === 'function') {
      props.additionalProps = await Component.getInitialProps(ctx);
      return props;
    }

    // Get or Create the store
    const isAdmin = asPath.indexOf('admin') !== -1;
    const store = storeProvider(undefined, isServer, isAdmin);

    if (typeof Component.validateAuthorization === 'function') {
      const validateAuthorizationCall = Component.validateAuthorization(ctx, store.getState);

      if (isServer) {
        await validateAuthorizationCall;
      }
    }

    if (typeof Component.initializeSentry === 'function') {
      Component.initializeSentry(store.getState);
    }

    if (typeof Component.getPageData === 'function') {
      /** this will also fetch translations */
      const getPageDataCall = Component.getPageData(ctx, store.dispatch, store.getState);

      if (isServer) {
        const pageDataCallProps = await getPageDataCall;
        props.pageProps = pageDataCallProps;
      }
    }

    props.initialState = store.getState();
    props.isAdmin = isAdmin;
    return props;
  }

  constructor(props) {
    super(props);
    if (props.initialState) {
      this.store = storeProvider(props.initialState, props.isServer, props.isAdmin);
    }
  }

  renderPageComponent() {
    const { Component, pageProps, translations } = this.props;
    return <Component {...pageProps} translations={translations} />;
  }

  render() {
    if (!this.store) {
      return this.renderPageComponent();
    }

    return <Provider store={this.store}>{this.renderPageComponent()}</Provider>;
  }
}

export default App;
