import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummery.css';

const checkoutSummery = (props) => {

    return (
        <div className={classes.CheckoutSummery}>
            <h1>Hope it will taste great!</h1>
            <div style={{width: '100%', height: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button clicked={props.checkoutCancel} buttonType="Danger">CANCEL</Button>
            <Button clicked={props.checkoutContinue} buttonType="Success">CONTINUE</Button>
        </div>
    )
}

export default checkoutSummery;