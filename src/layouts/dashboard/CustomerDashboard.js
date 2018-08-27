/*eslint no-useless-constructor: 0*/

import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class CustomerDashboard extends Component {
    constructor(props) {
        super(props);
    }

    onClick(store) {
        browserHistory.push(`/customer/${store.owner}/${store.idx}`);
    }

    render() {
        let stores = [];
        Object.keys(this.props.allData).forEach(owner => {
            this.props.allData[owner].forEach(store => {
                stores.push(Object.assign({ }, store, {owner, }));
            });
        });
        return (
            <div>
                <div style={{'marginBottom': '2rem', }}>Please select a store to shop in!</div>
                {stores && stores.map((store, i) => {
                    let imgSrc = `data:image/jpg;base64, ${store.imgBuffer}`;
                    return (<button className='storeFront' key={i} onClick={this.onClick.bind(this, store)}>
                        <h1>{store.name}</h1>
                        <img id="storeImg" src={imgSrc} alt="store"></img>
                    </button>)
                })}
            </div>
        )
    }
}

export default CustomerDashboard;