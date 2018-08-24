import React, { Component } from 'react';
import { Link } from 'react-router';
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js';
import getWeb3 from './util/getWeb3';
import OnlineMarketplace from '../build/contracts/OnlineMarketplace.json';

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
      this.setupIPFS();
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
