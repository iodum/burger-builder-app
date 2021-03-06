import React from 'react';
import classes from './Order.css';
import Button from '../UI/Button/Button';

const order = (props) => {
    const ingridients = [];
    for (let ingredientName in props.ingredients) {
        if ( props.ingredients[ingredientName]  > 0 ) {
            ingridients.push({
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            });
        }
    }

    const ingridientOutput = ingridients.map(ig => {
        return <span
            className={classes.Ingredient}
            key={ig.name}>{ig.name} ({ig.amount})</span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: { ingridientOutput }</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
            <Button btnType="Danger" clicked={props.removed}>Remove</Button>
        </div>
    )
}

export default order;
