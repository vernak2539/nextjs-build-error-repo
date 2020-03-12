import React, { Component } from 'react';

import styles from './styles.scss';

export class AgentPreferences extends Component {
  renderModalFooter = () => <div className={styles.modalFooter}>common.save_text</div>;

  render() {
    return <>{this.renderModalFooter()}</>;
  }
}

export default AgentPreferences;
