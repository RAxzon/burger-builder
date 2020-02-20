import React, { Component } from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

// Receive props
class burger extends Component {
    
    componentDidMount() {
        console.log("Burger Mounted")
    }

    render() {

    // 1 => Object, gives an array of the keys,
    // provided from the ingredients object
    // 2 => 
    let transformedIngredients = Object.keys(this.props.ingredients)
    .map(igKey => {
        return [...Array(this.props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
        // prev value, curr value, CHECK OUT map and reduce
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if (transformedIngredients.length === 0) { transformedIngredients = <p>Please add ingredients</p>}

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}
}

export default burger;