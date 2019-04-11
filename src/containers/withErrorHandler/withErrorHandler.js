import React, { Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = ( WrappedComponet, axios ) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);
        return (
            <Fragment>
                <Modal show={error} modalClosed={clearError}>
                    { error ? error.message : null }
                </Modal>
                <WrappedComponet {...props} />
            </Fragment>
        )
    }
}

export default withErrorHandler;
