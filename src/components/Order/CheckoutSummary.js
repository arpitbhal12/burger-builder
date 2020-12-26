import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1 style={{marginTop: "79px", marginBottom:"-17px"}}>We hope it tastes well!</h1>
			<div style={{width: "80%", height: "80%", margin: "auto"}}>
				<Burger ingredients={props.ingredients}/>
			</div>
			<Button btnType="Success" clicked={props.continued}>Continue</Button>
			<Button btnType="Danger" clicked={props.cancelled}>Cancel</Button>
		</div>
	);
};

export default CheckoutSummary;