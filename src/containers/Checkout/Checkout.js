import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
	// componentDidMount() {
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	console.log(query.get('bacon'));
	// 	const pulledIngredients = {};
	// 	let pulledPrice = 0;
	// 	query.forEach((key, value) => {
	// 		if(value!=='price') {
	// 			pulledIngredients[value] = +key;
	// 		} else {
	// 			pulledPrice = +key;
	// 		}
	// 	})
	// 	console.log(pulledIngredients);
	// 	this.setState({ingredients: pulledIngredients, price: pulledPrice});
	// }

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		let summary = <Redirect to="/" />;
		if (Object.keys(this.props.ings).length !== 0) {
			summary = (
				<div>
					<CheckoutSummary
						ingredients={this.props.ings}
						continued={this.checkoutContinuedHandler}
						cancelled={this.checkoutCancelledHandler}
					/>
					<Route path={this.props.match.path + '/contact-data'} component={ContactData} />
				</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients
	};
};

export default connect(mapStateToProps)(Checkout);
