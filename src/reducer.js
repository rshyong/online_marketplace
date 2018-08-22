import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import layoutsReducer from './layouts/layoutsReducer';

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  layouts: layoutsReducer,
})

export default reducer
