import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Page = (props) => (
  <Fragment>
    <Head>
      <title>Agent Support</title>
    </Head>
    {props.children}
  </Fragment>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
