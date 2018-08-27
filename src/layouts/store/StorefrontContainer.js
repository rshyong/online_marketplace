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
      products: state.layouts.products,
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
            let addProdResult = await this.props.contract.addProduct(storeNum, name, price, quantity, ipfsHash, { from: this.props.account, });
            if (addProdResult) {
                dispatch({ type: 'SET_ERRORMSG', payload: '', });
                dispatch({ type: 'ADD_PRODUCT', payload: { storeNum, name, price, quantity, imgBuffer: imgBuffer.toString('base64'), }});
            }
          });
        };
    },
    updatePrice: async function(storeNum, productIdx, evt) {
        evt.preventDefault();
        let newPrice = document.querySelector(`#updatePrice${productIdx}`).value;
        let form = document.querySelector("#updatePriceForm");
        if (!newPrice) {
            dispatch({ type: 'SET_ERRORMSG', payload: 'newPriceError', });
            return;
        }
        form.reset();
        let result = await this.props.contract.changePrice(storeNum, productIdx.toString(), newPrice, { from: this.props.account, });
        if (result) dispatch({ type: 'UPDATE_PRICE', payload: { storeNum, productIdx, newPrice, }});
    },
    removeProduct: async function(storeNum, productIdx) {
        storeNum = Number(storeNum);
        await this.props.contract.deleteProduct(storeNum, productIdx.toString(), { from: this.props.account, });
        let newProducts = Object.assign([], this.props.products);
        newProducts = newProducts.map((product, i) => {
            if (i === storeNum) {
                product = product.filter(prod => prod.i !== productIdx);
            }
            return product;
        });
        dispatch({ type: 'SET_PRODUCTS', payload: newProducts, });
    },
    withdrawFunds: async function(store) {
        let storeNum = Number(this.props.params.storeNum);
        await this.props.contract.withdrawFunds(storeNum, {from: this.props.account, });
        let newStores = Object.assign([], this.props.owner_stores);
        newStores[storeNum].funds = 0;
        dispatch({ type: 'SET_OWNER_STORE', payload: newStores, });
    },
  }
}

const StorefrontContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Store);

export default StorefrontContainer;