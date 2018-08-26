const initialState = {
    owners: [],
    privilege: '',
    errorMsg: '',
    owner_stores: [],
    all_stores: [],
};
  
  const layoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_OWNER':
            return Object.assign({}, state, { owners: state.owners.concat([action.payload]), });
        case 'SET_OWNERS':
            return Object.assign({}, state, { owners: action.payload, });
        case 'SET_PRIVILEGE':
            return Object.assign({}, state, { privilege: action.payload, });
        case 'SET_ERRORMSG':
            return Object.assign({}, state, { errorMsg: action.payload, });
        case 'ADD_OWNER_STORE':
            return Object.assign({}, state, { owner_stores: state.owner_stores.concat([action.payload]), });
        default:
            return state;
    }
  }
  
  export default layoutsReducer