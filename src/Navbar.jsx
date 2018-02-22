import React, {Component} from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div id="usercount">{this.props.activeUsers} users are online. </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
