import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Layout>
          <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/auth" component={Auth} />
              <Route path="/logout" exact component={Logout} />
              <Route path="/" exact component={BurgerBuilder} />
          </Switch>
      </Layout>
    );
  }
}

export default App;
