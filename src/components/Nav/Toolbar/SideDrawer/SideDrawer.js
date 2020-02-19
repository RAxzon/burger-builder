import React, { Fragment } from 'react';
import classes from './SideDrawer.css';
import Logo from '../../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <Fragment>
        <Backdrop 
        show={props.open}
        click={props.closed}
        />

        <div className={attachedClasses.join(' ')}>
            <div>
            <Logo height="80px"/>
            </div>
            <nav>
                <NavItems/>
            </nav>
        </div>

    </Fragment>
    )
}

export default sideDrawer;