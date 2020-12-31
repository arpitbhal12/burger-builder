import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false
	}

	showSideDrawerHandler = () => {
		this.setState({showSideDrawer: false});
	}

	drawerToggleHandler = () => {
		this.setState((prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer}
		});
	}
	
	render() {
		return (
			<Aux>
				<Toolbar clicked={this.drawerToggleHandler}/>
				<SideDrawer show={this.state.showSideDrawer} clicked={this.showSideDrawerHandler}/>
				<main className={classes.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;
