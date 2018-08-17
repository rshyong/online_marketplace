import { connect } from 'react-redux'
import Profile from './Profile'

const mapStateToProps = (state, ownProps) => {
  return {
      user: state.user.data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default ProfileContainer
