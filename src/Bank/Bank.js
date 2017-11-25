import React from 'react';

import BankSection from './BankSection';

import './Bank.css';

const CLIENT_ID = 'e90bd9a2-d6af-4d88-b5e7-adfb0f2a6467';
const SECRET = 'R3cX0rR4eU3fK8nX0vB0oG6pI7nI6hL7tS5jS8fK5jB8gJ8hA8';

export default class Bank extends React.Component {
  state = {
    tilitapahtumat: []
  };

  componentDidMount() {
    fetch(`https://api.hackathon.developer.nordeaopenbanking.com/v1/authentication?state=123&client_id=${CLIENT_ID}&redirect_uri=https:%2F%2Fhttpbin.org%2Fanything`)
      .then(response => response.json())
      .then(json => json.args.code)
  }

  renderButton(text) {
    const selected = text == 'Verkkopankki';
    return (
      <div className={selected ? "BankButtonSelected" : "BankButton"}>
        {text}
      </div>
    );
  }

  render() {
    const buttonTexts = ['Verkkopankki', 'Viestit', 'Asetukset'];
    return (
      <div className="Bank">
        <div className="BankHeader">
          {buttonTexts.map(text => this.renderButton(text))}
        </div>
        <div className="BankContainer">
          <BankSection title="Tilitapahtumat">
          </BankSection>
          <BankSection title="Arvo-osuustili">
          </BankSection>
        </div>
      </div>
    );
  }
}
