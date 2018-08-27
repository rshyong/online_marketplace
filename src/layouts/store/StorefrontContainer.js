import { connect } from 'react-redux';
import Store from './Store';

const mapStateToProps = (state, ownProps) => {
  return {
      user: state.user.data,
      contract: ownProps.contract,
      account: ownProps.account,
      ipfs: ownProps.ipfs,
      owners: state.layouts.owners,
      privilege: state.layouts.privilege,
      errorMsg: state.layouts.errorMsg,
      owner_stores: state.layouts.owner_stores,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addNewProduct: async function(storeNum, evt) {
        evt.stopPropagation();
        evt.preventDefault();
        let name = document.querySelector('#newProductName').value;
        let price = document.querySelector('#newProductPrice').value;
        let quantity = document.querySelector('#newProductQuantity').value;
        let image = document.querySelector('#newProductImage').files[0];
        let form = document.querySelector("#productForm");
        if (!name) {
            dispatch({ type: 'SET_ERRORMSG', payload: 'productNameError', });
            return;
        } else if (!price) {
            dispatch({ type: 'SET_ERRORMSG', payload: 'productPriceError', });
            return;
        } else if (!quantity) {
            dispatch({ type: 'SET_ERRORMSG', payload: 'productQuantityError', });
            return;
        } else if (!image) {
            dispatch({ type: 'SET_ERRORMSG', payload: 'imageError', });
            return;
        } else {
            dispatch({ type: 'SET_ERRORMSG', payload: 'waitTime', });
        }
        form.reset();
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(image);
        reader.onloadend = async (reader) => {
          //file is converted to a buffer for upload to IPFS
          let imgBuffer = await Buffer.from(reader.currentTarget.result);
          // add to IPFS
          await this.props.ipfs.add(imgBuffer, async (err, result) => {
            let ipfsHash = result[0].hash;
            await this.props.contract.addProduct(storeNum, name, price, quantity, ipfsHash, { from: this.props.account, });
            dispatch({ type: 'ADD_PRODUCT', payload: { storeNum, name, price, quantity, imgBuffer: imgBuffer.toString('base64'), }});
          });
        };
    },
  }
}

const StorefrontContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Store);

export default StorefrontContainer;