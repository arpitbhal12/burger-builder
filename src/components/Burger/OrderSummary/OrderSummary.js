import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
	const ingredientsSummary = Object.keys(props.ingredients).map((igKey) => {
		return (
			<li key={igKey}>
				<span style={{ textTransform: 'capitalize' }}>
					{igKey}: {props.ingredients[igKey]}
				</span>
			</li>
		);
	});
	return (
		<Aux>
			<h3>Your order:</h3>
			<p>A delicious Burger with following ingredients:</p>
			<ul>{ingredientsSummary}</ul>
			<p>
				<strong>Total price: {props.price}</strong>
			</p>
			<Button btnType="Danger" clicked={props.purchaseCanceled}>
				CANCEL
			</Button>
			<Button btnType="Success" clicked={props.purchaseContinued}>
				CONTINUE
			</Button>
		</Aux>
	);
};

export default OrderSummary;
