import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h3>We hope it tastes well!</h3>
			<div style={{width: "80%", height: "80%", margin: "auto"}}>
				<Burger ingredients={props.ingredients}/>
			</div>
			<Button btnType="Success" clicked>Continue</Button>
			<Button btnType="Danger" clicked>Cancel</Button>
		</div>
	);
};

export default CheckoutSummary;