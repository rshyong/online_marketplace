/*eslint no-useless-constructor: 0*/

import React, { Component } from 'react';
import AdminDashboard from './AdminDashboard';
import StoreOwnerDashboard from './StoreOwnerDashboard';
import CustomerDashboard from './CustomerDashboard';

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
            ? <AdminDashboard addOwner={this.props.addOwner} owners={this.props.owners} />
            : this.props.privilege === 'Store Owner'
              ? <StoreOwnerDashboard account={this.props.account} ipfs={this.props.ipfs} addNewStore={this.addNewStore} errorMsg={this.props.errorMsg} stores={this.props.owner_stores}/>
              : <CustomerDashboard account={this.props.account} ipfs={this.props.ipfs} addNewStore={this.addNewStore} errorMsg={this.props.errorMsg} allData={this.props.all_data}/>
            }
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard;