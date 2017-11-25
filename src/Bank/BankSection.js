import React from 'react';

import './BankSection.css';

export default class BankSection extends React.Component {
  render() {
    return (
      <div className="BankSectionContainer">
        <div className="BankSectionTitle">
          {this.props.title}
        </div>
        {this.props.children}
      </div>
    );
  }
}
