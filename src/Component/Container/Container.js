import React, {Component} from 'react';
import LoginForm from '../Login/Form';
import {connect} from 'react-redux';
import Dashboard from '../Dashboard';
import Main from '../Main/main.js';
import '../Main/index.css';


class Container extends Component{
    
    render(){
        
        let filter = this.props.user;
        
        if(filter === null){
            return(<LoginForm/>);
        }else
            return(<Main/>)
    }
}

const mapStateToProps = state => {return state};

export default connect(mapStateToProps)(Container);