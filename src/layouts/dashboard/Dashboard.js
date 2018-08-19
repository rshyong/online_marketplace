/*eslint no-useless-constructor: 0*/

import React, { Component } from 'react'
import getWeb3 from '../../util/getWeb3';
import SimpleStorageContract from '../../../build/contracts/SimpleStorage.json'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storageValue: 0,
      web3: null,
      contract: null,
      account: null,
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
    const simpleStorage = contract(SimpleStorageContract);
    simpleStorage.setProvider(this.state.web3.currentProvider);

    let simpleStorageInstance;
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed()
      .then(instance => {
        simpleStorageInstance = instance;
        return simpleStorageInstance.set(5, { from: accounts[0],})
      })
      .then(() => {
        return simpleStorageInstance.get.call(accounts[0]);
      })
      .then(result => {
        return this.setState({ storageValue: result.c[0], contract: simpleStorageInstance, account: accounts[0], });
      })
    });
  }

  handleClick() {
    const contract = this.state.contract;
    const account = this.state.account;
    contract.set(3, { from: account, })
    .then(result => {
      return contract.get.call();
    })
    .then(result => {
      this.setState({
        storageValue: result.c[0],
      });
    });
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <p><strong>Congratulations {this.props.user.name}!</strong> If you're seeing this page, you've logged in with UPort successfully.</p>
            <button onClick={this.handleClick.bind(this)}>Set Storage</button>
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard;