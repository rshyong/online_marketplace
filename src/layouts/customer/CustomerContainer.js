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
  }
}

const CustomerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Customer);

export default CustomerContainer;