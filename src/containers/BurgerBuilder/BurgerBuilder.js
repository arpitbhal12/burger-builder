import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Axios from './../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENTS_PRICE = {
	salad: 0.1,
	cheese: 1,
	bacon: 2.3,
	meat: 2.5
};
class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		price: 0,
		itemPurchasable: 0,
		ordering: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		Axios.get('https://burger-builder-e324f-default-rtdb.firebaseio.com/ingredients.json')
			.then((respose) => {
				this.setState({ ingredients: respose.data });
			})
			.catch((error) => {
				this.setState({error: true});
			});
	}

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
		// this.setState({ loading: true });
		// const order = {
		// 	ingredients: this.state.ingredients,
		// 	price: this.state.price,
		// 	customer: {
		// 		name: 'Test User 1',
		// 		Address: 'India',
		// 		zipCode: '1234'
		// 	},
		// 	payment: 'COD'
		// };

		// Axios.post('/order.json', order)
		// 	.then((response) => this.setState({ loading: false }))
		// 	.catch((error) => console.log(error));
		const queryParam = [];
		for(let i in this.state.ingredients) {
			queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		const queryString = queryParam.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	};

	removeOrderSummaryhandler = () => {
		this.setState({ ordering: false });
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		let orderSummary = null;
		let burger = this.state.error ? <p style={{color: "black"}}>Ingredients can't be loaded!</p> : <Spinner />;
		if (this.state.ingredients) {
			orderSummary = (
				<OrderSummary
					price={this.state.price.toFixed(2)}
					ingredients={this.state.ingredients}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
				/>
			);
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
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
		for (let key in disabledInfo) {
			disabledInfo[key] = this.state.ingredients[key] <= 0;
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		return (
			<Aux>
				{burger}
				<Modal show={this.state.ordering} modalClosed={this.removeOrderSummaryhandler}>
					{orderSummary}
				</Modal>
				
			</Aux>
		);
	}
}

export default WithErrorHandler(BurgerBuilder, Axios);
