import React, { Component } from 'react';
import { Link } from 'react-router';
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js';
import getWeb3 from './util/getWeb3';
import OnlineMarketplace from '../build/contracts/OnlineMarketplace.json';
import store from './store';

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      contract: null,
      account: null,
      ipfs: null,
    };
  }

  async componentDidMount() {
    try {
      let results = await getWeb3;
      this.setState({
        web3: results.web3,
      });
      await this.instantiateContract();
      await this.setupIPFS();
      await this.getOwnStores();
      await this.getOwnProducts();
      await this.getAllStores();
    } catch(err) {
      console.error('Unable to initiate App.js', err);
    }
  }

  async instantiateContract() {
    const contract = require('truffle-contract');
    const onlineMarketplace = contract(OnlineMarketplace);
    onlineMarketplace.setProvider(this.state.web3.currentProvider);
    let accounts = await new Promise((resolve, reject) => {
      this.state.web3.eth.getAccounts((error, accts) => {
        if (error) reject(error);
        resolve(accts);
      });
    });
    let instance = await onlineMarketplace.deployed();
    this.setState({ contract: instance, account: accounts[0], });
  }

  setupIPFS() {
    const IPFS = require('ipfs-api');
    const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', });
    this.setState({ ipfs, });
  }

  async getOwnStores() {
    let account = this.state.account;
    let numStoreFronts = await this.state.contract.numStoreFronts(account);
    numStoreFronts = numStoreFronts.c[0];
    for (let i = 0; i < numStoreFronts; i++) {
      let storeFront = await this.state.contract.storeFronts(account, i);
      let imgBuffer = await new Promise((resolve, reject) => {
        this.state.ipfs.files.get(storeFront[1], (err, files) => {
          resolve(files[0].content.toString('base64'));
        });
      });
      store.dispatch({type: 'ADD_OWNER_STORE', payload: { name: storeFront[0], imgBuffer, numProducts: storeFront[3].c[0], }});
    }
  }

  async getOwnProducts() {
    let account = this.state.account;
    let ipfs = this.state.ipfs;
    let contract = this.state.contract;
    let storefronts = store.getState().layouts.owner_stores;
    let dispatch = store.dispatch;
    storefronts.forEach(async (store, idx) => {
      let numProducts = store.numProducts;
      let arr = [];
      for (let i = 0; i < numProducts; i++) {
        let product = await contract.getProduct(account, idx, i.toString(), { from: account, });
        if (product[0]) {
          let imgBuffer = await new Promise((resolve, reject) => {
            ipfs.files.get(product[3], (err, files) => {
              if (files) resolve(files[0].content.toString('base64'));
            });
          });
          arr.push({ idx, i, name: product[0], price: product[1].c[0], quantity: product[2].c[0], imgBuffer, });
        }
      }
      dispatch({ type: 'ADD_STORE_PRODUCTS', payload: arr, });
    });
  }

  async getAllStores() {
    let account = this.state.account;
    let ipfs = this.state.ipfs;
    let contract = this.state.contract;
    let numOwners = await contract.numStoreOwners.call({from : account, });
    numOwners = numOwners.c[0];
    let ownersArr = [];
    for (let i = 0; i < numOwners; i++) {
      let owner = await contract.storeOwners.call(i, {from : account, });
      ownersArr.push(owner);
    }
    let storeFronts = await new Promise((resolve, reject) => {
      let storefronts = [];
      ownersArr.forEach(async (owner, idx) => {
        let numStoreFronts = await contract.numStoreFronts.call(owner, { from: account, });
        numStoreFronts = numStoreFronts.c[0];
        for (let j = 0; j < numStoreFronts; j++) {
          let sf = await contract.storeFronts.call(owner, j, {from : account, });
          storefronts.push(sf);
          if (idx === ownersArr.length - 1 && j === numStoreFronts - 1) resolve(storefronts);
        }
      });
    });
    storeFronts = await Promise.all(storeFronts.map(async store => {
      let imgBuffer = await new Promise((resolve, reject) => {
        ipfs.files.get(store[1], (err, files) => {
          if (files) resolve(files[0].content.toString('base64'));
        });
      });
      return { name: store[0], imgBuffer, };
    }));
    store.dispatch({ type: 'SET_ALL_STORES', payload: storeFronts, });
  }

  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/profile" className="pure-menu-link">Profile</Link>
        </li>
        <LogoutButtonContainer />
      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <LoginButtonContainer />
      </span>
    )

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <Link to="/" className="pure-menu-heading pure-menu-link">MarketChain</Link>
          <ul className="pure-menu-list navbar-right">
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </ul>
        </nav>

        {React.Children.map(this.props.children, (child) => {
          return React.cloneElement(child, { web3: this.state.web3, contract: this.state.contract, account: this.state.account, ipfs: this.state.ipfs, })
        })}
      </div>
    );
  }
}

export default App
