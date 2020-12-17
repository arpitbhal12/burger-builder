import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
    salad: 0.1,
    cheese: 1,
    bacon: 2.3,
    meat: 2.5
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        price: 0
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.price;
        const newPrice = oldPrice + INGREDIENTS_PRICE[type] * updatedCount; 
        this.setState({ingredients: updatedIngredients, price: newPrice});
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls addIngredients={this.addIngredientHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder; 
