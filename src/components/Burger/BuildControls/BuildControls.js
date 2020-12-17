import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'

const BuildControls = (props) => {
    const controls = [
        {label: 'salad', type: 'salad'},
        {label: 'cheese', type: 'cheese'},
        {label: 'bacon', type: 'bacon'},
        {label: 'meat', type: 'meat'}
    ]
    return (
        <div className={classes.BuildControls}>
            {controls.map((index) => {
                return <BuildControl key={index.label} type={index.label} added={() => props.addIngredients(index.type)}/>
            })}
        </div>
    )
}

export default BuildControls;