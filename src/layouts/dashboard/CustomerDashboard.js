/*eslint no-useless-constructor: 0*/

import React, { Component } from 'react';

class CustomerDashboard extends Component {
    constructor(props) {
        super(props);
    }

    onClick() {

    }

    render() {
        console.log(this.props.stores);
        return (
            <div>
                <div>Please select a store to shop in!</div>
                {this.props.stores && this.props.stores.map((store, i) => {
                    let imgSrc = `data:image/jpg;base64, ${store.imgBuffer}`;
                    return (<button className='storeFront' key={i} onClick={this.onClick.bind(this, i)}>
                        <h1>{store.name}</h1>
                        <img id="storeImg" src={imgSrc} alt="store"></img>
                    </button>)
                })}
            </div>
        )
    }
}

export default CustomerDashboard;