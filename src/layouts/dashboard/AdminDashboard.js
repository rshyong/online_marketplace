/*eslint no-useless-constructor: 0*/

import React, { Component } from 'react';

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let owners = this.props.owners;
        return (
            <div>
                <form id='addressForm'>
                    <label>Please enter in a new store owner (address)</label>
                    <input type="text" id="newStoreOwner"/>
                    <br/>
                    <input type="submit" onClick={this.props.addOwner}/>
                </form>
                {
                    owners.length
                    ? <div>
                        <br/>
                        <strong>Please see below for a list of store owner addresses.</strong>
                        <ul>
                        {owners.map((owner, idx) => {
                            return <li key={idx} >{owner}</li>
                        })}
                        </ul>
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default AdminDashboard;