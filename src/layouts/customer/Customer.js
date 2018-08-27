/*eslint no-useless-constructor: 0*/

import React, { Component } from 'react';

class Customer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let store = this.props.all_data[this.props.params.id][this.props.params.storeNum];
        let imgSrc = `data:image/jpg;base64, ${store.imgBuffer}`;
        return (
            <main className="container">
                <div className='product'>
                <h1>{store.name}</h1>
                <img id="storeImg" src={imgSrc} alt="store"></img>
                </div>
                <h1>Products</h1>
                <div id='products'>
                    {store.products && store.products && store.products.map((product, i) => {
                        let imgSrc = `data:image/jpg;base64, ${product.imgBuffer}`;
                        let buyProduct = `buyProduct${i}`
                        return (
                            <div className='product' key={i} >
                                <h3>Name: {product.name}</h3>
                                <img id="productImg" src={imgSrc} alt="product"></img>
                                <div>Price: {product.price}</div>
                                <div>Quantity: {product.quantity}</div>
                                <form id='purchaseForm'>
                                    <label>Please enter in the quantity you want to buy</label>
                                    <input type="text" id={buyProduct}/>
                                    <br/>
                                    <input type="submit" value="Purchase" onClick={this.props.buyProduct.bind(this, store, buyProduct, i)}/>
                                </form>
                                {this.props.errorMsg === `missingQuantity${i}` 
                                    ? <div className='errorMsg'><strong>Please enter in a quantity.</strong></div>
                                    : null}
                                {this.props.errorMsg === `errorQuantity${i}` 
                                    ? <div className='errorMsg'><strong>Quantity unavailable.</strong></div>
                                    : null}
                                {this.props.errorMsg === `waitTime${i}`
                                    ? <div className='errorMsg'><strong>Your request is being processed. Please wait for the Metamask prompt.</strong></div>
                                    : null}
                            </div>
                        )
                    })}
                </div>
                <br/>
            </main>
        )
    }
}

export default Customer;