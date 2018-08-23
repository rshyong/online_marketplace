import { connect } from 'react-redux';
import Dashboard from './Dashboard';

const SET_OWNERS = 'SET_OWNERS';
const SET_PRIVILEGE = 'SET_PRIVILEGE';

const mapStateToProps = (state, ownProps) => {
  return {
      user: state.user.data,
      contract: ownProps.contract,
      account: ownProps.account,
      owners: state.layouts.owners,
      privilege: state.layouts.privilege,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addOwner: async function(evt) {
      evt.preventDefault();
      const contract = this.props.contract;
      const account = this.props.account;
      let address = document.querySelector('#newStoreOwner').value;
      let form = document.querySelector("#addressForm");
      await contract.addOwner(address, { from: account, });
      let owners = this.props.owners;
      owners.push(address);
      dispatch({ type: SET_OWNERS, payload: owners, });
      form.reset();
    },   
    getPrivilege: async function() {
      let isAdmin = await this.props.contract.isAdmin({from: this.props.account, });
      let isOwner = await this.props.contract.isOwner({from: this.props.account, });
      if (isAdmin) dispatch({ type: SET_PRIVILEGE, payload: 'Admin', });
      else if (isOwner) dispatch({ type: SET_PRIVILEGE, payload: 'Store Owner', });
      else dispatch({ type: SET_PRIVILEGE, payload: 'Customer', });
    },
    getOwners: async function() {
      if (this.props.privilege === 'Admin') {
        let owners = await this.props.contract.getOwners({ from: this.props.account, });
        dispatch({ type: SET_OWNERS, payload: owners, });
      }
    },
    addNewStore: async function(evt) {
      evt.preventDefault();
      let name = document.querySelector('#newStoreName').value;
      let image = document.querySelector('#newStoreImage').value;
      let form = document.querySelector("#storeForm");
      form.reset();
    }
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer
