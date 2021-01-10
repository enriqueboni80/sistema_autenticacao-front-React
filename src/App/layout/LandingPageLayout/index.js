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
import logo from '../../../assets/images/logo-puc-eventos-fundo-claro.png';

import fumarcLogo from './assets/images/fumarc.png'
import catedralLogo from './assets/images/catedral.png'
import santaMariaLogo from './assets/images/santa-maria.png'
import smcLogo from './assets/images/sociedade.png'
import arquidiocesebhLogo from './assets/images/arquidiocese-bh-100anos.png'


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
                                    <div className="footer-text">
                                        <p style={{ marginBottom: '25px' }}>Instituições da Arquidiocese de Belo Horizonte</p>
                                    </div>
                                    <ul className="footer-menu">
                                        <li className=""><a href="https://www.fumarc.org.br" title="FUMARC" target="_blank"><img src={fumarcLogo} alt="Fumarc Logo" /></a></li>
                                        <li className=""><a href="https://www.arquidiocesebh.org.br/site/arquidiocese.php?id=216" title="Rede Catedral" target="_blank"><img src={catedralLogo} alt="Catedral Logo" /></a></li>
                                        <li className=""><a href="https://www.santamaria.pucminas.br/" title="Colégio Santa Maria" target="_blank"><img src={santaMariaLogo} alt="Santa Maria Logo" /></a></li>
                                        <li className=""><a href="https://adm.pucminas.br/institucional/Paginas/entidade-mantenedora.aspx" title="SMC"><img src={smcLogo} alt="Sociedade Mineira de Cultura Logo" /></a></li>
                                        <li className=""><a href="https://www.arquidiocesebh.org.br/site/" title="Arquidiocese de Belo Horizonte" target="_blank"><img src={arquidiocesebhLogo} alt="Arquidiocese BH Logo" /></a></li>
                                    </ul>
                                    <div style={{ marginTop: '30px' }} className="footer-text">
                                        <img src={logo} alt="Datta Able Logo" />
                                        <p><a target="_blank" href="https://www.linkedin.com/in/enrique-bonifacio/">Enrique Bonifacio</a> - <a target="_blank" href="https://www.pucminas.br/institucional/Paginas/a-puc-minas.aspx">Pós-graducao em Web Full Stack 2019/2021</a></p>
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