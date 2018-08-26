/*eslint no-useless-constructor: 0*/

import React, { Component } from 'react';

class StoreOwnerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: [],
        };
    }

    componentDidMount() {
        let stores = [];
        this.props.stores.forEach((store, i) => {
            this.props.ipfs.files.get(store.ipfsHash, (err, files) => {
                let contentBuff = files[0].content.toString('base64');
                stores.push({ name: store.name, contentBuff, });
                this.setState({ stores, });
            });
        });
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
                    <label>Store Image (url): </label> <input type="file" id='newStoreImage'/>
                    </div>
                    {this.props.errorMsg === 'imageError' 
                    ? <div className='errorMsg'><strong>Please upload an image.</strong></div>
                    : null}
                    <br/>
                    <input type="submit" onClick={this.props.addNewStore}/>
                </form>
                <br/>
                <div id='storeFronts'>Storefronts</div>
                {this.state.stores.map((store, i) => {
                    let imgSrc = `data:image/jpg;base64, ${store.contentBuff}`;
                    return (
                        <button key={i} onClick={() => {}}>
                            <h1>{store.name}</h1>
                            <img id="storeImg" src={imgSrc}></img>
                        </button>
                    )
                })}
            </div>
        )
    }
}

export default StoreOwnerDashboard;