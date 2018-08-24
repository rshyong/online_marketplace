const initialState = {
    owners: [],
    privilege: '',
    errorMsg: '',
    stores: [],
};
  
  const layoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_OWNERS':
            return Object.assign({}, state, { owners: state.owners.concat([action.payload]), });
        case 'SET_PRIVILEGE':
            return Object.assign({}, state, { privilege: action.payload, });
        case 'SET_ERRORMSG':
            return Object.assign({}, state, { errorMsg: action.payload, });
        case 'ADD_STORE':
            return Object.assign({}, state, { stores: state.stores.concat([action.payload]), });
        default:
            return state;
    }
  }
  
  export default layoutsReducer