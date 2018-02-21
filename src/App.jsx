import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'},
      messages: [{
        id: 0,
        username: 'Bob',
        type: 'user',
        content: 'Has anyone seen my marbles?'
      },
      {
        id: 1,
        username: 'Anonymous',
        type: 'user',
        content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
      },
      {
        id: 2,
        type: 'system',
        content: 'Anonymous1 changed their name to nomnom.'
      }]
    };
  }

// currentUser: {name: ''},
// messages: [{
// id: 0,
// username: currentUser.name,
// type: 'system' || 'user',
// content: ''
  newMessage(userName, messageText) {
    const newMessageObj = {
      type: 'user',
      username: userName,
      content: messageText
    };
    console.log('about to send:', newMessageObj);
    this.socket.send(JSON.stringify(newMessageObj));
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = (openEvent) => {
      console.log("connected to WebSocket")
    };

    this.socket.onmessage = (evt) => {
      const newMessageObj = JSON.parse(evt.data);
      console.log('received message from web socket:', newMessageObj);
      const newMessages = this.state.messages.concat(newMessageObj);
      this.setState({
        messages: newMessages
      });
    };
  }

  render() {
    return (
      <div>
      <Navbar />
      <MessageList messages={this.state.messages} />
      <Chatbar username={this.state.currentUser.name} newMessage={this.newMessage.bind(this)} />
      </div>
    );
  }
}
export default App;
