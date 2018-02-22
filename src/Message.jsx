import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    //filters between user and system messages to set class for styling purposes
    const className = 'message' + (this.props.system ? ' system' : '');
    return (
        <div className={className}>
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
    );
  }
}

export default Message;