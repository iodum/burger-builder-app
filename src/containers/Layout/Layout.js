import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <Fragment>
            <Toolbar
                isAuth={props.isAuth}
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={props.isAuth}
                open={showSideDrawer}
                closed={sideDrawerToggleHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);
