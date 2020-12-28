import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
	let inputEle = null;
	switch (props.elementType) {
		case 'input':
			inputEle = <input className= {classes.InputElement} {...props.elementConfig} value={props.value} />;
			break;
		case 'textarea':
			inputEle = <textarea className= {classes.InputElement} {...props} {...props.elementConfig} value={props.value}/>;
			break;
		default:
			inputEle = <input className= {classes.InputElement} {...props} {...props.elementConfig} value={props.value}/>;
	}
	return (
		<div className={classes.Input}>
			<label className={classes.label}>{props.label}</label>
			{inputEle}
		</div>
	);
};

export default Input;
