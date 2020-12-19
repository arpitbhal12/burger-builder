import React from 'react';
import burgerLogo from '../../assets/burgerLogo.png';
import classes from './Logo.module.css';

const Logo = (props) => {
    return (
        <img className={classes.Logo} src={burgerLogo} alt="Burger logo" />
    )
}

export default Logo;