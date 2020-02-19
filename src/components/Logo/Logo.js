import React from 'react';
import Logo from '../../assets/Images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={Logo} alt="Logo"/>
    </div>
);

export default logo;