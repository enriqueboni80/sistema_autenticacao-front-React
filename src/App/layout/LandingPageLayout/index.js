import React, { Component, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './NavBar'
import routes from '../../../routes-landingPage'
import Loader from "../Loader";


//Esse CSS tem que vir após o component NavBar (por causa do CSS dos components)
import './assets/scss/styles.scss';
import './assets/scss/custom-style.scss'

import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../AdminLayout/Breadcrumb";
import logo from '../../../assets/images/logo.png';


class LandingPage extends React.Component {

    render() {


        const menu = routes.map((route, index) => {
            return (route.component) ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                        <route.component {...props} />
                    )} />
            ) : (null);
        });


        return (
            <Aux>
                <Breadcrumb />
                <div className="wrapper">
                    <NavBar />
                    <div className="main" id="main">
                        <Suspense fallback={<Loader />}>
                            <Switch>
                                {menu}
                                <Redirect from="/" to={this.props.defaultPath} />
                            </Switch>
                        </Suspense>

                        <div className="footer">
                            <div className="container">
                                <div className="col-md-12 text-center">
                                    <img src={logo} alt="Datta Able Logo" />
                                    <ul className="footer-menu">
                                        <li><a href='#'>Site</a></li>
                                        <li><a href='#'>Support</a></li>
                                        <li><a href='#'>Terms</a></li>
                                        <li><a href='#'>Privacy</a></li>
                                    </ul>
                                    <div className="footer-text">
                                        <p>
                                            Copyright © 2019 React Datta Able. All Rights Reserved.
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a id="back-top" className="back-to-top page-scroll" href="#main">
                            <i className="feather icon-arrow-up" />
                        </a>
                    </div>

                </div>
            </Aux>
        );
    }
}

export default LandingPage;