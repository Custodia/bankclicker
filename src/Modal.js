import React, { Component } from 'react';
import Pig from './Pig';

import './Modal.css';

const Modal = props => {
  const content = props.event ? <EventModal {...props} /> : <FriendsModal {...props} />;
  return (
    <div className={"modal" + (props.event ? " eventModal" : " friendsModal")} onClick={props.onClose}>
      {content}
    </div>
  );
}

const FriendsModal = ({ friends }) => {
  return (
    <div>
      <h1>Friend Piggies</h1>
      {friends.map(f => <FriendPig {...f} />)}
    </div>
  );
}

class FriendPig extends Component {
  state = {
    context: null
  }
  
  pig;
  
  componentDidMount() {
    const context = this.canvas.getContext('2d');
    this.setState({ context: context });
    this.pig = new Pig({ context });
    requestAnimationFrame(() => this.update());
  }
  
  update() {
    this.pig.update();
    const context = this.state.context;
    context.save();
    context.clearRect(0, 0, 250, 250);
    this.pig.render({...this.props ,...this.state});
    context.restore();
    requestAnimationFrame(() => this.update());
  }
  
  render() {
    const { name, friends } = this.props;
    return (
      <div className="FriendPigRow">
        <div>
          <canvas
            className="FriendPigCanvas"
            ref={ref => this.canvas = ref}
            width={250}
            height={250}
          />
        </div>
        <span>{name}</span>
      </div>
    )
  }
}

const EventModal = ({ event }) => (
  <div>
    <h1>{event.title}</h1>
    <span>{event.description}</span>
  </div>
);

export default Modal;