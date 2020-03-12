import React, { PureComponent } from 'react';

import AgentPreferencesModal from '../../components/AgentPreferences';

class AgentAppPreferences extends PureComponent {
  render() {
    return (
      <AgentPreferencesModal
        isOpen={this.props.isOpen}
        countryCode="uk"
        countries={['uk']}
        contentLabel="preferences"
        onClose={this.props.onClose}
        onSubmit={() => {}}
        preferredLanguage="uk"
        languages={['uk']}
      />
    );
  }
}
export default AgentAppPreferences;
