import React from 'react';
import Aux from '../../../hoc/Aux';

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
                {ingredientsSummary}
		</Aux>
	);
};

export default OrderSummary;
