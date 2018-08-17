// import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'
import { connectedReduxRedirect } from 'redux-auth-wrapper/history3/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
const locationHelper = locationHelperBuilder({});
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'

// Layout Component Wrappers

export const UserIsAuthenticated = connectedReduxRedirect({
  redirectPath: '/',
  authenticatedSelector: state => state.user.data !== null,
  authenticatingSelector: state => state.user.isLoading,
  AuthenticatingComponent: null,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
})

export const UserIsNotAuthenticated = connectedReduxRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/dashboard',
  authenticatedSelector: state => state.user.data === null,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false
})

// UI Component Wrappers

export const VisibleOnlyAuth = connectedAuthWrapper({
  authenticatedSelector: state => state.user.data !== null,
  wrapperDisplayName: 'VisibleOnlyAuth',
})

export const HiddenOnlyAuth = connectedAuthWrapper({
  authenticatedSelector: state => state.user.data === null,
  wrapperDisplayName: 'HiddenOnlyAuth',
})
