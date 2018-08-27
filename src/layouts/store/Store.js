/*eslint no-useless-constructor: 0*/

import React, { Component } from 'react';

class StoreOwnerDashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let store = this.props.owner_stores[this.props.params.storeNum];
        let imgSrc = `data:image/jpg;base64, ${store.imgBuffer}`;
        return (
            <main className="container">
                <div className='product'>
                <h1>{store.name}</h1>
                <img id="storeImg" src={imgSrc} alt="store"></img>
                </div>
                <form id='productForm'>
                    <div id='productForm'>Add a new product</div>
                    <br/>

                    <div className="productForm">
                    <label>Product Name: </label> <input type="text" id='newProductName'/>
                    </div>
                    {this.props.errorMsg === 'productNameError' 
                    ? <div className='errorMsg'><strong>Please enter in a name.</strong></div>
                    : null}
                    <br/>

                    <div className="productForm">
                    <label>Price: </label> <input type="text" id='newProductPrice'/>
                    </div>
                    {this.props.errorMsg === 'productPriceError' 
                    ? <div className='errorMsg'><strong>Please enter in a price.</strong></div>
                    : null}
                    <br/>

                    <div className="productForm">
                    <label>Quantity: </label> <input type="text" id='newProductQuantity'/>
                    </div>
                    {this.props.errorMsg === 'productQuantityError' 
                    ? <div className='errorMsg'><strong>Please enter in a quantity.</strong></div>
                    : null}
                    <br/>

                    <div className="productForm">
                    <label>Product Image: </label> <input type="file" id='newProductImage'/>
                    </div>
                    {this.props.errorMsg === 'imageError' 
                    ? <div className='errorMsg'><strong>Please upload an image.</strong></div>
                    : null}
                    <br/>

                    {this.props.errorMsg === 'waitTime' 
                    ? <div className='errorMsg'><strong>Your request is being processed. Please wait for the Metamask prompt.</strong></div>
                    : null}

                    <input type="submit" onClick={this.props.addNewProduct.bind(this, this.props.params.storeNum)}/>
                </form>

                <h1>Products</h1>
                <div id='products'>
                    {this.props.products && this.props.products[this.props.params.storeNum].map((product, i) => {
                        let imgSrc = `data:image/jpg;base64, ${product.imgBuffer}`;
                        return (
                            <div className='product' key={i} >
                                <h3>Name: {product.name}</h3>
                                <img id="storeImg" src={imgSrc} alt="product"></img>
                                <div>Price: {product.price}</div>
                                <div>Quantity: {product.quantity}</div>
                                <form id='updatePriceForm'>
                                    <label>Update Price</label>
                                    <input type="text" id='updatePrice'/>
                                    <input type="submit" onClick={this.props.updatePrice.bind(this, this.props.params.storeNum, i)}/>
                                </form>
                                {this.props.errorMsg === 'newPriceError'
                                ? <div className='errorMsg'><strong>Please enter in a new price.</strong></div>
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

export default StoreOwnerDashboard;