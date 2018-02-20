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
      id: Math.random(),
      type: 'user',
      username: userName,
      content: messageText
    };
    const newMessages = this.state.messages.concat(newMessageObj);
    this.setState({
      messages: newMessages
    });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
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
