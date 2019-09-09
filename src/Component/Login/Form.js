import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';

// -- loader --
import { css } from '@emotion/core';
import { FadeLoader} from 'react-spinners';
// -- end loader --

// // -- loader with overlay
// import { LoadingOverlay } from 'react-overlay-loader';
// import 'react-overlay-loader/styles.css';
// // -- end loader --

import {bindActionCreators} from 'redux';
import {getLogin,signin} from '../../Action/LoginActions';


const override = css`
    position: relative;
    display: block;
    margin: 0 auto;
    border: 0px solid black;
    color: violet;`;

class LoginForm extends Component {

    constructor(props){
        super(props);

        this.state = {
                email: '',
                password: '',
            }

        this.onSubmit.bind(this);
        this.changesUsername.bind(this);
        this.changesPassword.bind(this);
        this.signin.bind(this);
    }

    onSubmit = (data) => {
                
        //execute POST
        if(this.state.email.length <= 0 || this.state.password.length <= 0){
            alert("Please dont leave username or password blank")
        }else{
            // props for POST login
        }

    }

    changesUsername = (event) => {
        this.setState({email: event.target.value})
    } 

    changesPassword = (event) => {
        this.setState({password: event.target.value})
    }

    getLastUser(){
        console.log('mounted');
        this.props.getLogin();

    }

    signin = () =>{
        this.props.signin(this.state)
    }

    componentDidMount(){
        this.getLastUser();
    }


    render(){
       
        return(
            <div style={LoginStyle}>
                <FadeLoader
                    css={override}
                    sizeUnit={"px"}
                    size={100}
                    color={'green'}
                    loading={this.props.loadmask}
                />
                <h1 style={{textAlign: 'center',margin: 'auto'}}>{this.props.errorMessage}</h1>
                <Form>
                    <FormGroup>
                        <Label for="emailLabel">EMAIL ADDRESS</Label>
                        <Input type="email" name="email" value={this.state.email} onChange={this.changesUsername} placeholder="your email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="passwordLabel">PASSWORD</Label>
                        <Input type="password" name="password" value={this.state.password} onChange={this.changesPassword} placeholder="your password"/>
                    </FormGroup>
                    <Button onClick={this.signin}>LOGIN</Button>
                </Form>                            
            </div>
        )
    }
}

const LoginStyle = {
    borderWidth: 1,
    height: 50,
    width: 500,
    paddingTop: 100,
    margin: 'auto'
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            getLogin,signin
        },
            dispatch
    );

const mapStateToProps = state => { 
    return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);