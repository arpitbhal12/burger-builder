import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary';

class Checkout extends Component {
	state = {
		ingredients: {}
	};

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		console.log(query.get('bacon'));
		const pulledIngredients = {};
		query.forEach((key, value) => {
			pulledIngredients[value] = +key;
		})
		console.log(pulledIngredients);
		this.setState({ingredients: pulledIngredients});
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					continued={this.checkoutContinuedHandler}
					cancelled={this.checkoutCancelledHandler}
				/>
			</div>
		);
	}
}

export default Checkout;
