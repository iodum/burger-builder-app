import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    let validationError = null;
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.Error}>Please enter a valid value!</p>;
    }

    switch (props.elementType) {
        case 'textarea':
            inputElement = <textarea
                className={inputClasses.join(' ')}
                value={props.value}
                {...props.elementConfig}
                onChange={props.changed} />;
            break;
        case 'select':
            inputElement = <select
                className={inputClasses.join(' ')}
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
                className={inputClasses.join(' ')}
                value={props.value}
                {...props.elementConfig}
                onChange={props.changed} />;

    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.elementConfig.label}</label>
            { inputElement }
            { validationError }
        </div>
    );
}

export default input;
