import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
	state = {
		ingredients: {},
		price: 0
	};

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		console.log(query.get('bacon'));
		const pulledIngredients = {};
		let pulledPrice = 0;
		query.forEach((key, value) => {
			if(value!=='price') {
				pulledIngredients[value] = +key;
			} else {
				pulledPrice = +key;
			}
		})
		console.log(pulledIngredients);
		this.setState({ingredients: pulledIngredients, price: pulledPrice});
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
				<Route path={this.props.match.path + '/contact-data'} 
				render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.price}/>)} />
			</div>
		);
	}
}

export default Checkout;
