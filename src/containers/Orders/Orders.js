import React, { Component } from "react";
import Order from '../../components/Order/Order';
import axios from '../../../src/axios-orders.js';

class Orders extends Component {
    
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
        .then(response => {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({orders: fetchedOrders, loading: false})
        }).catch(error => {
                this.setState({loading: false})
                console.log(error);
            })
    }

    render () {

        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.totalPrice}
                    />
                )
             )}
            </div>
        )
    }
}

export default Orders;