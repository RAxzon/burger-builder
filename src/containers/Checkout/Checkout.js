import React, { Component } from "react";
import CheckoutSummery from '../../components/Order/CheckoutSummary/CheckoutSummery';
import { withRouter, Route } from 'react-router';
import ContactData from "../../components/Order/CheckoutSummary/ContactData/ContactData";

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            cheese: 1,
            bacon: 1,
            meat: 1
        },
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        let price = 0;
        for (let param of query.entries()) {
            // param[0] = ingredient
            // set value of param[0] to param[1]
            if (param[0] === 'price') {
                price += param[1]
            }
            else {
            ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price})
    }

    checkoutCancelHandler = () => {
        console.log(this.props)
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render () {

        return (
            <div>
                <CheckoutSummery 
                ingredients={this.state.ingredients}
                checkoutCancel={this.checkoutCancelHandler}
                checkoutContinue={this.checkoutContinueHandler}
                />
                <Route 
                path={this.props.match.url + "/contact-data"} 
                render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}
                // Whatever props this is present here will be passed on to ContactData
                {...props}
                />)}/>
            </div>
        );
    }
}

export default withRouter(Checkout);