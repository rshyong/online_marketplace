/*eslint no-useless-constructor: 0*/

import React, { Component } from 'react';
import AdminDashboard from './AdminDashboard';
import StoreOwnerDashboard from './StoreOwnerDashboard';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.addOwner = this.props.addOwner.bind(this);
    this.getOwners = this.props.getOwners.bind(this);
    this.getPrivilege = this.props.getPrivilege.bind(this);
    this.addNewStore = this.props.addNewStore.bind(this);
  }

  async componentDidMount() {
    await this.getPrivilege();
    await this.getOwners();
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Welcome to MarketChain</h1>
            <p><strong>Hi {this.props.user.name}!</strong></p>
            {this.props.privilege === 'Admin'
            ? <AdminDashboard owners={this.props.owners}/>
            : <StoreOwnerDashboard addNewStore={this.addNewStore}/>
            }
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard;