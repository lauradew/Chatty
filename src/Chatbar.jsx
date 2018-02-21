import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      messageText: ''
    };
  }

  onUserChange(event) {
    this.setState({username: event.target.value});
  }

  onMessageTextChange(event) {
    this.setState({messageText: event.target.value});
  }

  onMessageKeyPress(event) {
    if (event.key === 'Enter') {
      if (this.state.username !== this.props.username) {
        this.props.systemMessage(this.props.username, this.state.username);
        console.log(this.props.username, "user has changed", this.state.username);
      }
      this.props.newMessage(this.state.username, this.state.messageText);
      this.setState({messageText: ''}, );
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
        className="chatbar-username"
        placeholder="Your Name (Optional)"
        value={this.state.username}
        onChange={this.onUserChange.bind(this)}/>
        <input
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        value={this.state.messageText}
        onChange={this.onMessageTextChange.bind(this)}
        onKeyPress={this.onMessageKeyPress.bind(this)}
        />
      </footer>
    );
  }
}


export default Chatbar;