/*eslint no-useless-constructor: 0*/

import React, { Component } from 'react'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Profile</h1>
            <p>Change these details in UPort to see them reflected here.</p>
            <p>
              <strong>Name</strong><br />
              {this.props.user.name}
            </p>
          </div>
        </div>
      </main>
    )
  }
}

export default Profile
