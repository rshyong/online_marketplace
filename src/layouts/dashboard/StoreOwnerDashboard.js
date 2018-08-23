/*eslint no-useless-constructor: 0*/

import React, { Component } from 'react';

class StoreOwnerDashboard extends Component {
    constructor(props) {
        super(props);
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
                    <br/>
                    <div className="storeForm">
                    <label>Store Image (url): </label> <input type="text" id='newStoreImage'/>
                    </div>
                    <br/>
                    <input type="submit" onClick={this.props.addNewStore}/>
                </form>
            </div>
        )
    }
}

export default StoreOwnerDashboard;