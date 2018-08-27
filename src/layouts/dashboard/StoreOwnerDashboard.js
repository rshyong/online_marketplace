/*eslint no-useless-constructor: 0*/

import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class StoreOwnerDashboard extends Component {
    constructor(props) {
        super(props);
    }

    onClick(storeNum) {
        browserHistory.push(`/store/${this.props.account}/${storeNum}`);
    }

    render() {
        return (
            <div>
                <form id='storeForm'>
                    <div id='addNewStoreFront'>Add a new store front</div>
                    <br/>

                    <div className="storeForm">
                    <label>Store Name: </label> <input type="text" id='newStoreName'/>
                    </div>
                    {this.props.errorMsg === 'storeNameError' 
                    ? <div className='errorMsg'><strong>Please enter in a name.</strong></div>
                    : null}
                    <br/>

                    <div className="storeForm">
                    <label>Store Image: </label> <input type="file" id='newStoreImage'/>
                    </div>
                    {this.props.errorMsg === 'imageError' 
                    ? <div className='errorMsg'><strong>Please upload an image.</strong></div>
                    : null}
                    <br/>

                    {this.props.errorMsg === 'waitTime' 
                    ? <div className='errorMsg'><strong>Your request is being processed. Please wait for the Metamask prompt.</strong></div>
                    : null}

                    <input type="submit" onClick={this.props.addNewStore}/>
                </form>
                <br/>
                
                <h1>Storefronts</h1>
                <div id='storeFronts'>
                    {this.props.stores.map((store, i) => {
                        let imgSrc = `data:image/jpg;base64, ${store.imgBuffer}`;
                        return (
                            <button className='storeFront' key={i} onClick={this.onClick.bind(this, i)}>
                                <h1>{store.name}</h1>
                                <img id="storeImg" src={imgSrc} alt="store"></img>
                            </button>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default StoreOwnerDashboard;