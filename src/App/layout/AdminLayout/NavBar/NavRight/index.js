import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';

import ChatList from './ChatList';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import { Link } from 'react-router-dom';

class NavRight extends Component {
    /* state = {
        listOpen: false
    }; */

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            listOpen: false
        }
    };

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user_session'))
        if (user) {
            this.setState({ username: user.username })
        } else {
            this.setState({ username: 'não logado' })
        }
    }

    logOut = () => {
        localStorage.removeItem('user_session')
        this.setState({ username: 'não logado' })
        window.location.href = "/"
    }


    render() {

        return (
            <Aux>
                <ul className="navbar-nav ml-auto">
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-settings" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <img src={Avatar1} className="img-radius" alt="User Profile" />
                                    <span>{this.state.username}</span>
                                    <a href={DEMO.BLANK_LINK} onClick={this.logOut} className="dud-logout" title="Logout">
                                        <i className="feather icon-log-out" />
                                    </a>
                                </div>
                                <ul className="pro-body">
                                    <li><Link to="/" className="dropdown-item"><i className="feather icon-settings" />Visualizar Home</Link></li>
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
                <ChatList listOpen={this.state.listOpen} closed={() => { this.setState({ listOpen: false }); }} />
            </Aux>
        );
    }
}

export default NavRight;
