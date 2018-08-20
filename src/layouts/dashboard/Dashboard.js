/*eslint no-useless-constructor: 0*/

import React, { Component } from 'react'
import getWeb3 from '../../util/getWeb3';
import OnlineMarketplace from '../../../build/contracts/OnlineMarketplace.json';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      contract: null,
      account: null,
      owners: [],
    }
  }

  async componentWillMount() {
    try {
      let results = await getWeb3;
      this.setState({
        web3: results.web3,
      });
      this.instantiateContract();
    } catch(err) {
      console.error('Unable to find web3', err);
    }
  }

  instantiateContract() {
    const contract = require('truffle-contract');
    const onlineMarketplace = contract(OnlineMarketplace);
    onlineMarketplace.setProvider(this.state.web3.currentProvider);

    this.state.web3.eth.getAccounts((error, accounts) => {
      onlineMarketplace.deployed()
      .then(instance => {
        return this.setState( { contract: instance, account: accounts[0], });
      })
    });
  }

  addOwner(evt) {
    evt.preventDefault();
    const contract = this.state.contract;
    const account = this.state.account;
    let address = document.querySelector('#newStoreOwner').value;
    let form = document.querySelector("#addressForm");
    contract.addOwner(address, { from: account, })
      .then(() => {
        let owners = this.state.owners;
        owners.push(address);
        this.setState({
          owners,
        })
      })
      .then(() => {
        form.reset();
      });
  }

  render() {
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
              <input type="submit" onClick={this.addOwner.bind(this)}/>
            </form>
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard;