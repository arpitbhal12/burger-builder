import * as actionTypes from './actionsTypes';
import Axios from './../../axios-orders';

export const initPurchase = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	}
}

export const purchaseBurger = (orderData) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart());
		Axios.post('/order.json', orderData)
			.then((response) => {
				console.log(response.data);
				dispatch(purchaseBurgerSuccess(response.data, orderData));
			})
			.catch((error) => {
				console.log(error);
				dispatch(purchaseBurgerFail(true));
			});
	};
};
