import { connect } from 'react-redux';
import Dashboard from './Dashboard';

const SET_OWNER = 'SET_OWNER';
const SET_OWNERS = 'SET_OWNERS';
const SET_PRIVILEGE = 'SET_PRIVILEGE';
const SET_ERRORMSG = 'SET_ERRORMSG';
const ADD_STORE = 'ADD_STORE';

const mapStateToProps = (state, ownProps) => {
  return {
      user: state.user.data,
      contract: ownProps.contract,
      account: ownProps.account,
      ipfs: ownProps.ipfs,
      owners: state.layouts.owners,
      privilege: state.layouts.privilege,
      errorMsg: state.layouts.errorMsg,
      stores: state.layouts.stores,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addOwner: async function(evt) {
      evt.preventDefault();
      let address = document.querySelector('#newStoreOwner').value;
      let form = document.querySelector("#addressForm");
      await ownProps.contract.addOwner(address, { from: ownProps.account, });
      dispatch({ type: SET_OWNER, payload: address, });
      form.reset();
    },
    getPrivilege: async function() {
      let isAdmin = await this.props.contract.isAdmin.call({from: this.props.account, });
      let isOwner = await this.props.contract.storeOwnersAddress(this.props.account);
      if (isAdmin) dispatch({ type: SET_PRIVILEGE, payload: 'Admin', });
      else if (isOwner) dispatch({ type: SET_PRIVILEGE, payload: 'Store Owner', });
      else dispatch({ type: SET_PRIVILEGE, payload: 'Customer', });
    },
    getOwners: async function() {
      if (this.props.privilege === 'Admin') {
        let numOwners = await this.props.contract.numStoreOwners({ from: this.props.account, });
        let owners = [];
        for(let i = 0; i < numOwners; i++) {
          let owner = await this.props.contract.storeOwners(i, { from: this.props.account, });
          owners.push(owner);
        }
        dispatch({ type: SET_OWNERS, payload: owners, });
      }
    },
    addNewStore: async function (evt) {
      event.stopPropagation();
      evt.preventDefault();
      let name = document.querySelector('#newStoreName').value;
      let image = document.querySelector('#newStoreImage').files[0];
      let form = document.querySelector("#storeForm");
      form.reset();
      if (!name) {
        dispatch({ type: SET_ERRORMSG, payload: 'storeNameError', });
        return;
      } else if (!image) {
        dispatch({ type: SET_ERRORMSG, payload: 'imageError', });
        return;
      } else {
        dispatch({ type: SET_ERRORMSG, payload: '', });
      }
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(image);
      reader.onloadend = async (reader) => {
        //file is converted to a buffer for upload to IPFS
        let imgBuffer = await Buffer.from(reader.currentTarget.result);
        // add to IPFS
        await this.props.ipfs.add(imgBuffer, async (err, result) => {
          let ipfsHash = result[0].hash;
          await this.props.contract.addStoreFront(name, ipfsHash, { from: this.props.account, });
          dispatch({ type: ADD_STORE, payload: { name, ipfsHash, }});
        });
      };
    }
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer