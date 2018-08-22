/*eslint no-useless-constructor: 0*/

import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.addOwner = this.props.addOwner.bind(this);
  }

  async componentWillMount() {
    this.getOwners();
  }

  render() {
    let owners = this.props.owners;
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Welcome to MarketChain</h1>
            <p><strong>Hi {this.props.user.name}!</strong></p>
            <form id='addressForm'>
              <label>Please enter in a new store owner (address)</label>
              <input type="text" id="newStoreOwner"/>
              <br/>
              <input type="submit" onClick={this.addOwner}/>
            </form>
            {
              owners.length
              ? <div>
                  <br/>
                  <strong>Please see below for a list of store owner addresses.</strong>
                  <ul>
                    {owners.map((owner, idx) => {
                      return <li key={idx} >{owner}</li>
                    })}
                  </ul>
                </div>
              : null
            }
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard;