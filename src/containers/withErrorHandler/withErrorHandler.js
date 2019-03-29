import React, { Fragment, Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponet, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        constructor(props) {
            super(props);
            axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        errorConfirmHandler = () => {
            this.setState({error: null});
        }

        render () {
            let modal = null;
            if ( this.state.error ) {
                modal = <Modal
                    show={this.state.error}
                    modalClosed={this.errorConfirmHandler}>
                    { this.state.error ? this.state.error.message : null }</Modal>;
            }
            return (
                <Fragment>
                    {modal}
                    <WrappedComponet {...this.props} />
                </Fragment>
            )
        }
    }
}

export default withErrorHandler;
