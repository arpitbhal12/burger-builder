import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
	salad: 0.1,
	cheese: 1,
	bacon: 2.3,
	meat: 2.5
};
class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		price: 0,
		itemPurchasable: 0,
		ordering: false
	};

	purchasable = (totalPrice) => {
		if (totalPrice > 0) {
			return 1;
		} else {
			return 0;
		}
	};

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updatedCount;
		const oldPrice = this.state.price;
		const newPrice = oldPrice + INGREDIENTS_PRICE[type];
		const canPurchase = this.purchasable(newPrice);
		this.setState({ ingredients: updatedIngredients, price: newPrice, itemPurchasable: canPurchase });
	};

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updatedCount;
		const oldPrice = this.state.price;
		const newPrice = Math.max(0, oldPrice - INGREDIENTS_PRICE[type]);
		const canPurchase = this.purchasable(newPrice);
		this.setState({ ingredients: updatedIngredients, price: newPrice, itemPurchasable: canPurchase });
	};

	purchaseHandler = () => {
		this.setState({ ordering: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ ordering: false });
	};

	purchaseContinueHandler = () => {
		alert('You conitnued');
	};

	removeOrderSummaryhandler = () => {
		console.log("Hello");
		this.setState({ ordering: false });
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = this.state.ingredients[key] <= 0;
		}
		return (
			<Aux>
				<Burger ingredients={this.state.ingredients} />
				<Modal show={this.state.ordering} modalClosed={this.removeOrderSummaryhandler}>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchaseCanceled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
					/>
				</Modal>
				<BuildControls
					addIngredients={this.addIngredientHandler}
					removeIngredients={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.price}
					isPurchasable={this.state.itemPurchasable}
					ordered={this.purchaseHandler}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
