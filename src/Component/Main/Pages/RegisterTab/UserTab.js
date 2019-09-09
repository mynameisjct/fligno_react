import React, {Component} from 'react';
import RegisterForm from '../../Forms/RegisterForm';

class UserTab extends Component{
    constructor(props){
        super(props);
        
        this.shouldRoute.bind(this)
    }

    shouldRoute = (val) =>{
        this.props.propsToMain(val.enabled, val.enabledUser)

        if(val.enabled === 'auto'){
            this.props.history.push({
                pathname: "/Register/ProfileTab",
                formData: val
            })
        }
    }

    render(){
        return(
            <RegisterForm propToTab={this.shouldRoute}  />
        );
    }
}

export default UserTab;