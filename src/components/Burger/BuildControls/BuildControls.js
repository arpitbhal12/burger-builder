import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const BuildControls = (props) => {
	console.log("is purchasable" + props.issPurchasable);
	const controls = [
		{ label: 'salad', type: 'salad' },
		{ label: 'cheese', type: 'cheese' },
		{ label: 'bacon', type: 'bacon' },
		{ label: 'meat', type: 'meat' }
	];
	return (
		<div className={classes.BuildControls}>
			<p>
				Current price: <strong>{props.price.toFixed(2)}</strong>
			</p>
			{controls.map((index) => {
				return (
					<BuildControl
						key={index.label}
						type={index.label}
						disabled={props.disabled[index.label]}
						added={() => props.addIngredients(index.type)}
						removed={() => props.removeIngredients(index.type)}
					/>
				);
			})}
			<button className={classes.OrderButton} disabled={props.isPurchasable === 0}>ORDER BURGER</button>
		</div>
	);
};

export default BuildControls;
