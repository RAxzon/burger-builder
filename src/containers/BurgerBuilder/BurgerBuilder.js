import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControlls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../../src/axios-orders.js';
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.7,
    bacon: 1.2
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    };

    addIngredientHandler = (type) => {
        // Select the old ingredient amount 
        const updatedCount = this.state.ingredients[type] + 1;
        // Create a new array, using the spread operator
        const updatedIngredients = {
            ...this.state.ingredients
        };
        // Add new count to the ingredients array where type matches
        updatedIngredients[type] = updatedCount;
        const priceAdd = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAdd;
        // Update state
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
        this.updatePurchaseState(updatedIngredients); 
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0){
            return;
        }
        const updatedCount = this.state.ingredients[type] - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceRemove = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceRemove;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
        this.updatePurchaseState(updatedIngredients); 
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchaseable: sum > 0})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice.toFixed(2),
            customer: {
                name: 'Richie Axelsson',
                address: {
                    street: 'Street1',
                    zipCode: '123456789',
                    city: 'Halmstad',
                    country: 'Sweden'
                },
                email: 'Richie@burger.com'
            },
            deliveryWay: 'home'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
                console.log(response);
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
                console.log(error);
            })
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };
        
        for (let key in disabledInfo) {
            // boolean
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = <OrderSummery 
        ingredients={this.state.ingredients}
        cancelPurchase={this.purchaseCancelHandler}
        continuePurchase={this.purchaseContinueHandler}
        totalPrice={this.state.totalPrice}
        />

        if (this.state.loading) {
            orderSummary = <Spinner/>
        } 

        return (
            <Aux>
                <Modal 
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}
                >
                {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdd={this.addIngredientHandler}
                ingredientRemove={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchaseable={!this.state.purchaseable}
                purchased={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;