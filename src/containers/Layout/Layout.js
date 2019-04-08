import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render () {
        return (
            <Fragment>
                <Toolbar
                    isAuth={this.props.isAuth}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={this.props.isAuth}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerToggleHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
