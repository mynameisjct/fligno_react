import React, {Component} from 'react';
import RegisterForm from '../Forms/RegisterForm';
import RegisterTab from '../Pages/RegisterTab/index';

class Register extends Component{

    constructor(props){
        super(props);

        this.state = {
            name: ''
        };
    }

    render(){
        return(
            <div>
                <RegisterTab/>
                {/* <RegisterForm/> */}
            </div>
        );
    }
}

export default Register;