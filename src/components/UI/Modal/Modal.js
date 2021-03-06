import React, { Component } from 'react';

import classes from './Modal.module.css';
import BackDrop from '../BackDrop/BackDrop';
import Aux from '../../../hoc/Aux/Aux';

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.show !== this.props.show || this.props.children !== nextProps.children) return true;
		else return false;
	}

	render() {
		return (
			<Aux>
				<BackDrop show={this.props.show} hideSummary={this.props.modalClosed} />
				<div
					className={classes.Modal}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0'
					}}
				>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}

export default Modal;
