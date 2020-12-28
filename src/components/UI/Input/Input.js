import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    let inputEle = null;
    let inputClasses = [classes.InputElement];
    if(props.invalid && props.shouldValidate) {
        inputClasses.push(classes.Invalid);
    }
	switch (props.elementType) {
		case 'input':
			inputEle = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
			break;
		case 'textarea':
			inputEle = <select className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
            case ( 'select' ):
                inputEle = (
                    <select
                        className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </select>
                );
                break;
		default:
			inputEle = <input className= {classes.InputElement} {...props.elementConfig} value={props.value}/>;
	}
	return (
		<div className={classes.Input}>
			<label className={classes.label}>{props.label}</label>
			{inputEle}
		</div>
	);
};

export default Input;
