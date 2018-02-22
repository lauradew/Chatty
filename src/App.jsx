import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUsers: '',
      currentUser: {name: ''},
      messages: []
    };
  }

  newMessage(userName, messageText) {
    const newMessageObj = {
      type: 'user',
      username: userName,
      content: messageText
    };
    console.log('about to send:', newMessageObj);
    this.socket.send(JSON.stringify(newMessageObj));
  }

  systemMessage(oldUser, newUser) {
    const newMessageObj = {
      type: 'system',
      content: oldUser + ' changed their name to ' + newUser + '.'
    };
    this.socket.send(JSON.stringify(newMessageObj));
    this.setState({currentUser: {name: newUser}});
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = (openEvent) => {
      console.log("connected to WebSocket")
    };

    this.socket.onmessage = (evt) => {
      const messageContainer = JSON.parse(evt.data);
      if (messageContainer.messageType === 'message') {
        const newMessageObj = messageContainer.payload;
        console.log('received message from web socket:', newMessageObj);
        const newMessages = this.state.messages.concat(newMessageObj);
        this.setState({
          messages: newMessages
        });
      } else if (messageContainer.messageType === 'userCount') {
        const activeCount = messageContainer.payload;
        this.setState({activeUsers: activeCount})
    }
    };
  }

  render() {
    return (
      <div>
      <Navbar activeUsers={this.state.activeUsers} />
      <MessageList messages={this.state.messages} />
      <Chatbar username={this.state.currentUser.name} newMessage={this.newMessage.bind(this)} systemMessage={this.systemMessage.bind(this)} />
      </div>
    );
  }
}
export default App;
