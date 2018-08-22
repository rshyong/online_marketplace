import { connect } from 'react-redux';
import Dashboard from './Dashboard';

const SET_OWNERS = 'SET_OWNERS';

const mapStateToProps = (state, ownProps) => {
  return {
      user: state.user.data,
      contract: ownProps.contract,
      account: ownProps.account,
      owners: state.layouts.owners,
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
    getOwners: async function() {
      // await contract.addOwner(address, { from: account, });
    }
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer
