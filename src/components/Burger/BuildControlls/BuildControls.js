import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label : 'Salad', type: 'salad'},
    { label : 'Bacon', type: 'bacon'},
    { label : 'Cheese', type: 'cheese'},
    { label : 'Meat', type: 'meat'}
]

// The button know what ingredient to remove by passing the type to the
// next level. Type is defined in the control object array
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Burger Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(control => (
            <BuildControl 
            clickAdd={() => props.ingredientAdd(control.type)}
            clickRemove={() => props.ingredientRemove(control.type)} 
            key={control.label} 
            label={control.label}
            disabled={props.disabled[control.type]}
            />
        ))}
        <button 
        className={classes.OrderButton} 
        disabled={props.purchaseable}
        onClick={props.purchased}
        >
            ORDER NOW
        </button>
    </div>
)

export default buildControls; 