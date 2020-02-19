import React, { Component } from 'react';
import classes from './BurgerIngredient.css'
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    
    render () {

    let ingredient = null;

    // Inside a class, this must be in front of props
    switch (this.props.type) {
        case ('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case ('bread-top'):
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;
        case ('meat'):
            ingredient = <div className={classes.Meat}></div>;
            break;
        case ('cheese'):
            ingredient = <div className={classes.Cheese}></div>;
            break;
        case ('bacon'):
            ingredient = <div className={classes.Bacon}></div>;
            break;
        case ('salad'):
            ingredient = <div className={classes.Salad}></div>;
            break;
        default:
            ingredient = null;
    }

    return ingredient;
    }
}

// Validation
BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;

// Implement later instead switch

// const dogSwitch = (breed) => ({
//     "border": "Border Collies are good boys and girls.",
//     "pitbull": "Pit Bulls are good boys and girls.",
//     "german": "German Shepherds are good boys and girls."
//   })[breed]
//   dogSwitch("border") // "Border Collies are good boys and girls."