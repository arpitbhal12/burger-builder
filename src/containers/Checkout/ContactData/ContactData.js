import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Aux from '../../../hoc/Aux/Aux';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postal: ''
		}
	};
	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Test User 1',
				Address: 'India',
				zipCode: '1234'
			},
			payment: 'COD'
		};

		Axios.post('/order.json', order)
			.then((response) => {
				console.log(response.data);
				this.setState({ loading: false });
			})
			.catch((error) => console.log(error));
		console.log(this.props.ingredients);
	};
	render() {
		let form = <Spinner />;
		if (!this.state.loading) {
			form = (
				<Aux>
					<h3>Enter your details</h3>
					<form>
						<input className={classes.Input} type="text" name="name" placeholder="Enter your name" />
						<input
							className={classes.Input}
							type="text"
							name="email"
							placeholder="Enter your E-mail address"
						/>
						<input className={classes.Input} type="text" name="street" placeholder="Enter your street" />
						<input
							className={classes.Input}
							type="text"
							name="postal"
							placeholder="Enter your Postal Code"
						/>
						<Button btnType="Success" clicked={this.orderHandler}>
							Order
						</Button>
					</form>
				</Aux>
			);
		}
		return (
			<div className={classes.ContactData}>
				{form}
			</div>
		);
	}
}

export default ContactData;
