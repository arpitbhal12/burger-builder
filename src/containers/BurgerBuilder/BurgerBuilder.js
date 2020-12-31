import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Axios from './../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';


class BurgerBuilder extends Component {
	// ingredients would be coming from redux
	state = {
		// ingredients: null,
		price: 0,
		itemPurchasable: 0,
		ordering: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		// Axios.get('https://burger-builder-e324f-default-rtdb.firebaseio.com/ingredients.json')
		// 	.then((respose) => {
		// 		this.setState({ ingredients: respose.data });
		// 	})
		// 	.catch((error) => {
		// 		this.setState({error: true});
		// 	});
	}

	purchasable = (totalPrice) => {
		if (totalPrice > 0) {
			return 1;
		} else {
			return 0;
		}
	};

	// addIngredientHandler = (type) => {
	// 	const oldCount = this.state.ingredients[type];
	// 	const updatedCount = oldCount + 1;
	// 	const updatedIngredients = { ...this.state.ingredients };
	// 	updatedIngredients[type] = updatedCount;
	// 	const oldPrice = this.state.price;
	// 	const newPrice = oldPrice + INGREDIENTS_PRICE[type];
	// 	const canPurchase = this.purchasable(newPrice);
	// 	this.setState({ ingredients: updatedIngredients, price: newPrice, itemPurchasable: canPurchase });
	// };

	// removeIngredientHandler = (type) => {
	// 	const oldCount = this.state.ingredients[type];
	// 	if (oldCount <= 0) {
	// 		return;
	// 	}
	// 	const updatedCount = oldCount - 1;
	// 	const updatedIngredients = { ...this.state.ingredients };
	// 	updatedIngredients[type] = updatedCount;
	// 	const oldPrice = this.state.price;
	// 	const newPrice = Math.max(0, oldPrice - INGREDIENTS_PRICE[type]);
	// 	const canPurchase = this.purchasable(newPrice);
	// 	this.setState({ ingredients: updatedIngredients, price: newPrice, itemPurchasable: canPurchase });
	// };

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
		// const queryParam = [];
		// for (let i in this.state.ingredients) {
		// 	queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		// }
		// queryParam.push('price=' + this.props.prc);
		// const queryString = queryParam.join('&');
		this.props.history.push('/checkout');
	};

	removeOrderSummaryhandler = () => {
		this.setState({ ordering: false });
	};

	render() {
		const disabledInfo = {
			...this.props.ings
		};
		let orderSummary = null;
		let burger = this.state.error ? <p style={{ color: 'black' }}>Ingredients can't be loaded!</p> : <Spinner />;
		if (this.props.ings) {
			orderSummary = (
				<OrderSummary
					price={this.props.prc.toFixed(2)}
					ingredients={this.props.ings}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
				/>
			);
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						addIngredients={this.props.onIngredientAdded}
						removeIngredients={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						price={this.props.prc}
						isPurchasable={this.purchasable(this.props.prc)}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = this.props.ings[key] <= 0;
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

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		prc: state.totalPrice
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
		onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, Axios));
