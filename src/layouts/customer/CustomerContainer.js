import { connect } from 'react-redux';
import Customer from './Customer';

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
      all_data: ownProps.all_data,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    buyProduct: async function(store, id, i, evt) {
        evt.preventDefault();
        let quantity = document.querySelector(`#${id}`).value;
        quantity = Number(quantity);
        let totalPrice = Number(store.products[i].price) * quantity;
        let form = document.querySelector("#purchaseForm");
        if (!quantity) {
          dispatch({ type: 'SET_ERRORMSG', payload: `missingQuantity${i}` , });
          return;
        } else if (quantity > store.products[i].quantity) {
          dispatch({ type: 'SET_ERRORMSG', payload: `errorQuantity${i}` , });
          return;
        } else {
          dispatch({ type: 'SET_ERRORMSG', payload: `waitTime${i}`, });
        }
        form.reset();
        await this.props.contract.buyProduct(this.props.params.id, Number(store.idx), store.products[i].idx.toString(), quantity, {from: this.props.account, value: totalPrice, });
    }
  }
}

const CustomerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Customer);

export default CustomerContainer;