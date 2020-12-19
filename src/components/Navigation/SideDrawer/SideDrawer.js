import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/Aux';
import BackDrop from '../../UI/BackDrop/BackDrop';

const SideDrawer = (props) => {
	return (
		<Aux>
			<BackDrop show={props.show} hideSummary={props.clicked}/>
			<div className={classes.SideDrawer}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Aux>
	);
};

export default SideDrawer;
