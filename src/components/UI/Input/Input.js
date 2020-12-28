import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
	let inputEle = null;
	switch (props.type) {
		case 'input':
			inputEle = <input className= {classes.InputElement} {...props} />;
			break;
		case 'textarea':
			inputEle = <textarea className= {classes.InputElement} {...props} />;
			break;
		default:
			inputEle = <input className= {classes.InputElement} {...props} />;
	}

	return (
		<div className={classes.Input}>
			<label className={classes.label}>{props.label}</label>
			{inputEle}
		</div>
	);
};

export default Input;
