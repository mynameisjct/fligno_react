import React, {Component} from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Logout from '../Logout';

class Main extends Component{
    render(){
        return(
            <HashRouter>
                <div>
                    <h1>Absolute Network Solutions <Logout/></h1>
                    <ul className="header_main">
                        <li><NavLink exact to = "/">Home</NavLink></li>
                        <li><NavLink to = "/Register">Register</NavLink></li>
                        <li><NavLink to = "/Profile">Profile</NavLink></li>
                    </ul>
                    <div className="content_main">
                        <Route exact path= "/" component={Home} />
                        <Route path= "/Register" component={Register} />
                        <Route path= "/Profile" component={Profile} />
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default Main;