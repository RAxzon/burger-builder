import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControlls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../../src/axios-orders.js';
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.7,
    bacon: 1.2
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount = () => {
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        }).catch(error => {
            this.setState({error: true})
        })
    }

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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&')
        console.log(queryString);
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };
        
        for (let key in disabledInfo) {
            // boolean
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        
        if (this.state.ingredients) {
            burger = <div><Burger ingredients={this.state.ingredients}/>
            <BuildControls 
            ingredientAdd={this.addIngredientHandler}
            ingredientRemove={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={!this.state.purchaseable}
            purchased={this.purchaseHandler}
            />
            </div>
            orderSummary = 
                <OrderSummery 
                ingredients={this.state.ingredients}
                cancelPurchase={this.purchaseCancelHandler}
                continuePurchase={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}
                />
        } 
        
        if (this.state.loading) {
            orderSummary = <Spinner/>
        } 

        return (
            <Aux>
                <Modal 
                show={this.state.purchasing}
                clicked={this.purchaseCancelHandler}
                >
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default WithErrorHandler(BurgerBuilder, axios);