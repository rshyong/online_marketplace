const initialState = {
    owners: [],
    privilege: '',
    errorMsg: '',
    owner_stores: [],
    products: [],
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
        case 'ADD_PRODUCT':
            let sNum = action.payload.storeNum;
            delete action.payload.storeNum;
            let storeProducts = state.products[sNum] || [];
            storeProducts.push(action.payload);
            let newProducts = Object.assign([], state, state.products, storeProducts);
            return Object.assign({}, state, { producs: newProducts, });
        case 'ADD_STORE_PRODUCTS':
            return Object.assign({}, state, { products: state.products.concat([action.payload]), });
        case 'UPDATE_PRICE':
            let updatedProducts = Object.assign([], state.products);
            let { storeNum, productIdx, newPrice, } = action.payload;
            updatedProducts[ Number(storeNum)][Number(productIdx)].price = newPrice;
            return Object.assign({}, state, { products: updatedProducts, });
        default:
            return state;
    }
  }
  
  export default layoutsReducer