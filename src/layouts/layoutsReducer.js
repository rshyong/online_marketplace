const initialState = {
    owners: [],
    privilege: '',
    errorMsg: '',
    owner_stores: [],
    products: [],
    all_data: [],
};
  
  const layoutsReducer = (state = initialState, action) => {
    let updatedProducts;
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
            let storNum = action.payload.storeNum;
            delete action.payload.storeNum;
            let newProducts = Object.assign([], state.products);
            let storeProducts = Object.assign([], state.products[storNum]);
            storeProducts.push(action.payload);
            newProducts[storNum] = storeProducts;
            return Object.assign({}, state, { products: newProducts, });
        case 'ADD_STORE_PRODUCTS':
            updatedProducts = Object.assign([], state.products);
            action.payload.forEach(product => {
                let idx = product.idx;
                delete product.idx;
                updatedProducts[idx] = updatedProducts[idx] || [];
                updatedProducts[idx].push(product);
            });
            return Object.assign({}, state, { products: updatedProducts, });
        case 'UPDATE_PRICE':
            updatedProducts = Object.assign([], state.products);
            let { storeNum, productIdx, newPrice, } = action.payload;
            updatedProducts[ Number(storeNum)].filter(prod => prod.i === Number(productIdx))[0].price = newPrice;
            return Object.assign({}, state, { products: updatedProducts, });
        case 'SET_OWNER_STORE':
            return Object.assign({}, state, { owner_stores: action.payload, });
        case 'SET_PRODUCTS':
            return Object.assign({}, state, { products: action.payload, });
        default:
            return state;
    }
  }
  
  export default layoutsReducer