import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Aux from '../../../hoc/Aux/Aux';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: ''
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: ''
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: ''
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail'
				},
				value: ''
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value: ''
			}
		},
		loading: false
	};

	formChangeHandler(event, key) {
		let updatedOrderForm = {
			...this.state.orderForm
		}
		let updatedFormElement = {
			...updatedOrderForm[key]
		}
		updatedFormElement.value = event.target.value;
		updatedOrderForm[key] = updatedFormElement;
		this.setState({orderForm: updatedOrderForm});
	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
		Axios.post('/order.json', order)
			.then((response) => {
				console.log(response.data);
				this.setState({ loading: false });
			})
			.catch((error) => console.log(error));
		console.log(this.props.ingredients);
	};

	render() {
		const formElementsList = [];
		for (let key in this.state.orderForm) {
			formElementsList.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		let form = <Spinner />;
		if (!this.state.loading) {
			form = (
				<Aux>
					<h3>Enter your details</h3>
					<form>
						{formElementsList.map((formElement) => {
							return (
								<Input
									elementType={formElement.config.elementType}
									elementConfig={formElement.config.elementConfig}
									value={formElement.config.value}
									changed={(event) => this.formChangeHandler(event,formElement.id)}
								/>
							);
						})}
						<Button btnType="Success" clicked={this.orderHandler}>
							Order
						</Button>
					</form>
				</Aux>
			);
		}
		return <div className={classes.ContactData}>{form}</div>;
	}
}

export default ContactData;
