import React from 'react';

import BankSection from './BankSection';
import { randomNumBetween } from '../helpers';

import './Bank.css';
import './BankLoader.css';

const CLIENT_ID = 'e90bd9a2-d6af-4d88-b5e7-adfb0f2a6467';
const SECRET = 'R3cX0rR4eU3fK8nX0vB0oG6pI7nI6hL7tS5jS8fK5jB8gJ8hA8';

const MOCK_INVESTMENTS = [
  {
    name: 'Nimi',
    purchaseValue: 'Ostohinta',
    value: 'Keskihinta',
    count: 'Omistus'
  },
  {
    name: 'Arctech',
    purchaseValue: randomNumBetween(60, 130),
    value: randomNumBetween(80, 120),
    count: randomNumBetween(5, 50)
  },{
    name: 'Google',
    purchaseValue: randomNumBetween(300, 530),
    value: randomNumBetween(380, 700),
    count: randomNumBetween(1, 25)
  },{
    name: 'Ramirent',
    purchaseValue: randomNumBetween(20, 50),
    value: randomNumBetween(30, 90),
    count: randomNumBetween(20, 90)
  },{
    name: 'Walmart',
    purchaseValue: randomNumBetween(100, 130),
    value: randomNumBetween(110, 200),
    count: randomNumBetween(10, 30)
  },{
    name: 'Citigroup',
    purchaseValue: randomNumBetween(20, 100),
    value: randomNumBetween(80, 250),
    count: randomNumBetween(10, 30)
  },{
    name: 'Apple',
    purchaseValue: randomNumBetween(100, 600),
    value: randomNumBetween(350, 900),
    count: randomNumBetween(1, 30)
  },{
    name: 'SSAB B',
    purchaseValue: randomNumBetween(40, 120),
    value: randomNumBetween(60, 200),
    count: randomNumBetween(4, 30)
  },{
    name: 'Pöyry',
    purchaseValue: randomNumBetween(20, 130),
    value: randomNumBetween(40, 180),
    count: randomNumBetween(10, 100)
  },
];

const Loading = (props) => {
  if (props.loading) {
    return (
      <div className="BankListItem">
        <div className="loader">
          Loading...
        </div>
      </div>
    );
  } else {
    return props.children;
  }
};

const Modal = (props) => {
  if (!props.isOpen) return null;
  return (
    <div>
      <div onClick={props.onClose} className="BankModalBackground" />
      <div className="BankModalContainer">
        {props.children}
      </div>
    </div>
  );
};

const ListItem = (props) => {
  const { index, children } = props;
  let className = "BankListItem";
  if (index === 0) className = "BankListItemFirst";
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default class Bank extends React.Component {
  state = {
    payments: [],
    investments: MOCK_INVESTMENTS,
    loading: true,
    modalInvestmentIndex: 0
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
          .then(data => this.setState({
            payments: [
              {
                amount: 'Määrä',
                creditor: {
                  account: {
                    value: 'Tililtä'
                  },
                  message: 'Viesti',
                  name: 'Nimi'
                },
                debtor: {
                  _accountId: 'Tilille'
                },
                paymentStatus: 'Status'
              },
              ...data.response.payments
            ],
            loading: false
          }))
        });
      })
  }

  handleBuy = index => {
    fetch('./api/buy')
    this.handleOpenModal(index);
  }

  handleOpenModal = index => this.setState({ modalInvestmentIndex: index });

  handleCloseModal = () => this.setState({ modalInvestmentIndex: 0 });

  renderButton(text, i) {
    const selected = text === 'Verkkopankki';
    return (
      <div key={i} className={selected ? "BankButtonSelected" : "BankButton"}>
        {text}
      </div>
    );
  }

  renderPayment(payment, index) {
    const { amount, creditor, debtor } = payment;
    return (
      <ListItem key={index} index={index}>
        <span style={{ flex: 2 }}>{creditor.account.value}</span>
        <span style={{ flex: 2 }}>{debtor._accountId.split('-')[0]}</span>
        <span style={{ flex: 1 }}>
          {
            index === 0 ? amount : amount + ' €'
          }
        </span>
        <span style={{ flex: 1 }}>{creditor.name}</span>
      </ListItem>
    );
  }

  renderInvestment(investment, index) {
    const { name, purchaseValue, value, count } = investment;
    return (
      <ListItem key={index} index={index}>
        <span style={{ flex: 2 }}>{name}</span>
        <span style={{ flex: 1 }}>
          {
            index === 0
            ? count
            : Math.round(count)
          }
        </span>
        <span style={{ flex: 2 }}>
          {
            index === 0
            ? value
            : Math.round(value * 100) / 100 + ' €'
          }
        </span>
        <span style={{ flex: 2 }}>
          {
            index === 0
            ? purchaseValue
            : Math.round(purchaseValue * 100) / 100 + ' €'
          }
        </span>
        <span style={{ flex: 2 }}>
          {
            index === 0
            ? 'Arvonmuutos %'
            : Math.round(((value - purchaseValue) / purchaseValue) * 10000) / 100 + ' %'
          }
        </span>
        <span style={{ flex: 2 }}>
          {
            index === 0
            ? 'Arvonmuutos €'
            : Math.round((value - purchaseValue) * count * 100) / 100 + ' €'
          }
        </span>
        <span style={{ flex: 2 }}>
          {
            index === 0
            ? 'Yhteensä'
            : Math.round(count) * Math.round(value * 100) / 100 + ' €'
          }
        </span>
        <span style={{ flex: 1 }}>
          {
            index > 0 && <div className="BankBuyButton" onClick={() => this.handleBuy(index)}>Osta</div>
          }
        </span>
      </ListItem>
    );
  }

  renderPaymentCount() {
    return <div className="BankPaymentShowing">{'Näytetään 10 / ' + this.state.payments.length}</div>
  }

  renderModalContent() {
    const investment = this.state.investments[this.state.modalInvestmentIndex];
    const { name, value, purchaseValue, count } = investment;
    return (
      <div className="BankModal">
        <div className="BankModalText">{'Ostotapahtuma onnistui: ' + name}</div>
        <div onClick={this.handleCloseModal} className="BankModalBuyButton">Sulje</div>
      </div>
    );
  }

  render() {
    const buttonTexts = ['Verkkopankki', 'Viestit', 'Asetukset'];
    return (
      <div className="Bank">
        <Modal onClose={this.handleCloseModal} isOpen={this.state.modalInvestmentIndex}>
          {this.renderModalContent()}
        </Modal>
        <div className="BankHeader">
          {buttonTexts.map((text, i) => this.renderButton(text, i))}
        </div>
        <div className="BankContainer">
          <BankSection title="Tilitapahtumat">
            <Loading loading={this.state.loading}>
              {this.state.payments.slice(0,10).map((payment, i) => this.renderPayment(payment, i))}
              {this.renderPaymentCount()}
            </Loading>
          </BankSection>
          <BankSection title="Arvo-osuustili">
            <Loading loading={this.state.loading}>
              {this.state.investments.map((investment, i) => this.renderInvestment(investment, i))}
            </Loading>
          </BankSection>
        </div>
      </div>
    );
  }
}
