/*eslint no-useless-constructor: 0*/

import React, { Component } from 'react';

class CustomerDashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>Please select a store to shop in!</div>
            </div>
        )
    }
}

export default CustomerDashboard;