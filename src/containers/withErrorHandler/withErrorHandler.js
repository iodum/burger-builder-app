import React, { Fragment, useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponet, axios ) => {
    return props => {
        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(request => {
            setError(null);
            return request
        });
        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });

        const errorConfirmHandler = () => {
            setError(null);
        }

        let modal = null;
        if ( error ) {
            modal = <Modal
                show={error}
                modalClosed={errorConfirmHandler}>
                { error ? error.message : null }</Modal>;
        }

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject( reqInterceptor );
                axios.interceptors.response.eject( resInterceptor );
            }
        }, [reqInterceptor, resInterceptor]);

        return (
            <Fragment>
                {modal}
                <WrappedComponet {...props} />
            </Fragment>
        )
    }
}

export default withErrorHandler;
