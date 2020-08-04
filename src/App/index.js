import React, { Component, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";

import CONSTANT from "./../store/constant"

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

const LandingPageLayout = Loadable({
    loader: () => import('./layout/LandingPageLayout'),
    loading: Loader
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false
        }
    };

    UNSAFE_componentWillMount() {
        this.checkIsAdmin()
    }

    checkIsAdmin = async () => {
        if (localStorage.getItem('user_session')) {
            let gruposQuePertence = JSON.parse(localStorage.getItem('user_session')).grupos
            //TODO PERMISSÃO PROVISORIO - SE FOR DIFERENTE DE CLIENT PODE ACESSAR
            gruposQuePertence.map((grupo) => {
                if (grupo !== CONSTANT.CLIENTS) {
                    this.setState({ isAdmin: true })
                }
                return ""
            })
        }
    }

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
                <ScrollToTop>
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            {menu}
                            {
                                !this.state.isAdmin ? <Route path="/" component={LandingPageLayout} /> :
                                    this.state.isAdmin ? <Route path="/" component={AdminLayout} />
                                        : <Redirect to='/' />
                            }
                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Aux>
        );
    }
}

export default App;
