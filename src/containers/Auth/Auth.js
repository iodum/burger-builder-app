import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index'
import { updateObject, checkValidity } from '../../shared/utility';

const auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                label: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                label: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);

    useEffect(() => {
        if ( !props.building && props.authRedirect !== '/') {
            props.onSetAuthRedirectPath();
        }
    }, []);

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = updateObject(controls, {
            [inputIdentifier]: updateObject(controls[inputIdentifier], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[inputIdentifier].validation),
                touched: true
            })
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }

        setControls(updatedControls);
        setFormIsValid(formIsValid);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    }

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    }

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        });
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)}
            />
    ));

    if ( props.loading ) {
        form = <Spinner />
    }

    let errorMessage = null;
    if ( props.error ) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }

    let authRedirect = null;
    if ( props.isAuth ) {
        authRedirect = <Redirect to={props.authRedirect} />;
    }

    return (
        <div className={classes.Auth}>
            { authRedirect }
            {errorMessage}
            <form onSubmit={submitHandler}>
                { form }
                <Button btnType="Success" disabled={!formIsValid}>SUBMIT</Button>
            </form>
            <Button btnType="Danger" clicked={switchAuthModeHandler}>SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirect
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass, isSignUp) => dispatch(actions.auth(email, pass, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);
