import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span 
            style={{textTransform: 'capitalize'}}>
            {igKey}</span>: {this.props.ingredients[igKey]}</li>
        });

        return (
            <Aux>
            <h3>Your Order</h3>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price:</strong> ${this.props.totalPrice.toFixed(2)}</p>
            <p>Continue to Checkout?</p>
            <Button clicked={this.props.cancelPurchase} buttonType="Danger">CANCEL</Button>
            <Button clicked={this.props.continuePurchase} buttonType="Success">CONTINUE</Button>
        </Aux>
        );
    }
}

export default OrderSummary;