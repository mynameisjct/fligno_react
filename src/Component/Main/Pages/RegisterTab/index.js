import React, {Component} from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import UserTab from '../RegisterTab/UserTab';
import ProfileTab from '../RegisterTab/ProfileTab';

class RegisterTab extends Component{
    constructor(props){
        super(props);

        this.state = {
            accessablePath: 'none',
            accessablePathUser: 'auto'
        }

        this.enabled.bind(this);
        this.disable.bind(this);
    }

    enabled = (p,u) => {
        this.setState({accessablePath: p, accessablePathUser: u})
    }

    disable = (e) => {
        this.setState({accessablePath: e})
    }

    render(){
        return(
            <HashRouter>
                <div>   
                    <ul className="header_sub">
                        <li style={{pointerEvents: this.state.accessablePathUser }}><NavLink exact to = "/Register/User">User Login</NavLink></li>
                        <li style={{pointerEvents: this.state.accessablePath }}><NavLink to = "/Register/ProfileTab">Profile Description</NavLink></li>
                    </ul>
                    <div className="content_main">
                        {/* <Route exact path= "/Register/User" component={UserTab} /> */}
                        <Route exact path= "/Register/User"  render={(prop) => <UserTab {...prop} propsToMain={this.enabled} isAuthed={true} /> } />
                        <Route path= "/Register/ProfileTab" render={(props)=> <ProfileTab {...props} disableProfileTab={this.disable}/> }/>
                        
                        {/*
                            # USE THIS BELOW TO ACCESS PROPS FROM CHILD
                            <Route exact path= "/Register/User"  render={(props) => <UserTab {...props} isAuthed={true} /> } />
                        */}
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default RegisterTab;