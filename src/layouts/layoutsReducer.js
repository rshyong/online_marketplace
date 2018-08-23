const initialState = {
    owners: [],
    privilege: '',
};
  
  const layoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_OWNERS':
            return Object.assign({}, state, { owners: action.payload.concat([]), });
        case 'SET_PRIVILEGE':
            return Object.assign({}, state, { privilege: action.payload, });
        default:
            return state;
    }
  }
  
  export default layoutsReducer
  