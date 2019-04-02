import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case 'textarea':
            inputElement = <textarea
                className={classes.TextareaElement}
                value={props.value}
                {...props.elementConfig}
                onChange={props.changed} />;
            break;
        case 'select':
            inputElement = <select
                className={classes.InputElement}
                onChange={props.changed} value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>;
            break;
        default:
            inputElement = <input
                className={classes.InputElement}
                value={props.value}
                {...props.elementConfig}
                onChange={props.changed} />;

    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.elementConfig.label}</label>
            { inputElement }
        </div>
    );
}

export default input;
