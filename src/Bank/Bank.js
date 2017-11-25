import React from 'react';

import BankSection from './BankSection';

import './Bank.css';
import './BankLoader.css';

const CLIENT_ID = 'e90bd9a2-d6af-4d88-b5e7-adfb0f2a6467';
const SECRET = 'R3cX0rR4eU3fK8nX0vB0oG6pI7nI6hL7tS5jS8fK5jB8gJ8hA8';

export default class Bank extends React.Component {
  state = {
    payments: [],
    loading: true
  };

  componentDidMount() {
    fetch(`https://api.hackathon.developer.nordeaopenbanking.com/v1/authentication?state=123&client_id=${CLIENT_ID}&redirect_uri=https:%2F%2Fhttpbin.org%2Fanything`)
      .then(response => response.json())
      .then(json => {
        const { code } = json.args;
        fetch(
          `https://api.hackathon.developer.nordeaopenbanking.com/v1/authentication/access_token?code=${code}&redirect_uri=https:%2F%2Fhttpbin.org%2Fanything`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-IBM-Client-Id': CLIENT_ID,
              'X-IBM-Client-Secret': SECRET
            }
          }
        ).then(response => response.json())
        .then(data => {
          const accessToken = data['access_token'];
          fetch(
            `https://api.hackathon.developer.nordeaopenbanking.com/v2/payments/sepa`,
          {
            method: 'GET',
            headers: {
              'X-IBM-Client-Id': CLIENT_ID,
              'X-IBM-Client-Secret': SECRET,
              Authorization: `Bearer ${accessToken}`,
              'content-type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => this.setState({ payments: data.response.payments, loading: false }))
        });
      })
  }

  handleBuy = () => {
    fetch('./api/buy')
  }

  renderButton(text, i) {
    const selected = text === 'Verkkopankki';
    return (
      <div key={i} className={selected ? "BankButtonSelected" : "BankButton"}>
        {text}
      </div>
    );
  }

  renderPayment(payment) {
    const { amount, } = payment;
    return (
      <div className="BankPayment">
        <span className="BankPaymentAmount">{amount + ' €'}</span>
        <span className="BankPaymentName">{payment.creditor.name}</span>
      </div>
    );
  }

  renderPayments() {
    if (this.state.loading) {
      return (
        <div className="BankLoading">
          <div className="loader">
            Loading...
          </div>
        </div>
      );
    }
    return this.state.payments.slice(0,10).map(payment => this.renderPayment(payment));
  }

  renderPaymentCount() {
    const { length } = this.state.payments;
    if (length === 0) return null;
    else return <div className="BankPaymentShowing">{'Showing 10 out of ' + length}</div>
  }

  render() {
    const buttonTexts = ['Verkkopankki', 'Viestit', 'Asetukset'];
    return (
      <div className="Bank">
        <div className="BankHeader">
          {buttonTexts.map((text, i) => this.renderButton(text, i))}
        </div>
        <div className="BankContainer">
          <BankSection title="Tilitapahtumat">
            {this.renderPayments()}
            {this.renderPaymentCount()}
          </BankSection>
          <BankSection title="Arvo-osuustili">
            <div onClick={this.handleBuy}>BUY BUY BUY</div>
          </BankSection>
        </div>
      </div>
    );
  }
}
