import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Aux from '../../../hoc/Aux/Aux';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				validation: {
					required: false
				},
				value: '',
				valid: true,
				touched: false
			}
		},
		formIsValid: false,
		loading: false
	};

	checkValidity(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	formChangeHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.touched = true;
		if (inputIdentifier !== 'select') {
			updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		}
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData
		};
		this.props.onOrderBurger(order);
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
		if (!this.props.loading) {
			form = (
				<Aux>
					<h3>Enter your details</h3>
					<form>
						{formElementsList.map((formElement) => {
							return (
								<Input
									key={formElement.id}
									elementType={formElement.config.elementType}
									elementConfig={formElement.config.elementConfig}
									value={formElement.config.value}
									changed={(event) => this.formChangeHandler(event, formElement.id)}
									shouldValidate={formElement.config.elementType !== 'select'}
									invalid={!formElement.config.valid}
									touched={formElement.config.touched}
								/>
							);
						})}
						<Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>
							Order
						</Button>
					</form>
				</Aux>
			);
		}
		return <div className={classes.ContactData}>{form}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return { onOrderBurger: (orderDtata) => dispatch(actions.purchaseBurger(orderDtata)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, Axios));
