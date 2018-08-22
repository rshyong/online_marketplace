import { connect } from 'react-redux';
import Profile from './Profile';

const SET_PRIVILEGE = 'SET_PRIVILEGE';

const mapStateToProps = (state, ownProps) => {
  return {
      user: state.user.data,
      contract: ownProps.contract,
      account: ownProps.account,
      privilege: state.layouts.privilege,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userPrivilege: async function() {
      let isAdmin = await this.props.contract.isAdmin({from: this.props.account, });
      let isOwner = await this.props.contract.isOwner({from: this.props.account, });
      if (isAdmin) dispatch({ type: SET_PRIVILEGE, payload: 'Admin', });
      else if (isOwner) dispatch({ type: SET_PRIVILEGE, payload: 'Store Owner', });
      else dispatch({ type: SET_PRIVILEGE, payload: 'Customer', });
    }
  }
}

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default ProfileContainer
