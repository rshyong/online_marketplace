/*eslint no-useless-constructor: 0*/

import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Profile</h1>
            <p>
              <strong>Privileges: </strong> {this.props.privilege}
              <br/><br/>
              <strong>Name: </strong> {this.props.user.name}
              <br/><br/>
              <strong>Phone: </strong> {this.props.user.phone}
              <br/><br/>
              <strong>Country: </strong> {this.props.user.country}
            </p>
          </div>
        </div>
      </main>
    )
  }
}

export default Profile
