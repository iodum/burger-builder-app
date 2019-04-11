import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';

const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth');
});

const app = props => {
    useEffect(() => {
        props.onAuthCheckState();
    }, []);

    let routes = (
        <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/"/>
        </Switch>
    );
    if ( props.isAuth ) {
        routes = (
            <Switch>
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/logout" exact component={Logout} />
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/"/>
            </Switch>
        );
    }
    return (
      <Layout>
          <Suspense fallback={<Spinner />}>
              { routes }
          </Suspense>
      </Layout>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthCheckState: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
