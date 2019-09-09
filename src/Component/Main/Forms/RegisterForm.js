import React, {Component} from 'react';
import {Label,Input,Button,Form,FormGroup,Table} from 'reactstrap';
import Modal from '../Forms/Modal/Modal';
import './styles.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {checkEmailFormat} from '../../../Action/ValidationActions';
import {resetErrorMessage} from '../../../Action/CommonActions';

class RegisterForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            reTypePass: '',
            nickName: '',
            showModal: false,
            showFormModal: false,
            message: '',
            enabled: 'none',
            enabledUser: 'auto',
        };

        this.emailChange.bind(this);
        this.passwordChange.bind(this);
        this.retypePassword.bind(this);
        this.nickNameChange.bind(this);

        this.submitForm.bind(this);
        this.clearForm.bind(this);
        this.emmailValidation.bind(this);

        //MODAL
        this.messagemodal.bind(this);
        this.appleUpdate.bind(this);
    }   

    appleUpdate = () => {
        this.setState({ showModal: !this.state.showModal});
    }

    // clear form when successful
    messagemodal = (flag) => {
        this.setState({showFormModal: !this.state.showFormModal})
        console.log('+++++++++++' + flag);
        
        if(flag === 'clearForm'){
            this.clearForm()
        }
    }

    emailChange = e => {
        this.setState({email:e.target.value})
    }

    passwordChange = e => {
        this.setState({password:e.target.value})
    }

    retypePassword = e => { 
        this.setState({reTypePass:e.target.value})
    }

    nickNameChange = e => {
        this.setState({ nickName: e.target.value})
    }

    save() {
        this.props.save(this.state);
    }

    submitForm = async() =>{
        const {validation} = this.props

        if(this.state.email.length > 0 && !validation){
            this.setState({
                showModal: true,
                message: 'Invalid email address format or already existed!',
                enabled: 'none'
            });
        }else if(this.state.email.length <= 0 && this.state.password.length <=0 && this.state.reTypePass.length <= 0 && this.state.nickName.length <= 0){
            this.setState({
                showModal: true,
                message: 'Please provide email.\nPlease provide password.\nConfirm Password must not be blank.\nPlease provide nickname.',
                enabled: 'none'
            });
        }else if(this.state.email.length <= 0 && this.state.password.length <=0){
            this.setState({
                showModal: true,
                message: 'Please provide email.\nPassword must not be blank..',
                enabled: 'none'
            });
        }else if(this.state.email.length <= 0 && this.state.reTypePass.length <=0){
            this.setState({
                showModal: true,
                message: 'Please provide email.\nConfirm Password must not be blank..',
                enabled: 'none'
            });
        }else if(this.state.password.length <= 0 && this.state.reTypePass.length <=0){
            this.setState({
                showModal: true,
                message: 'Please provide password.\nConfirm Password must not be blank..',
                enabled: 'none'
            });
        }else if(this.state.email.length <= 0){

            let xtraMEssage;
            if(this.state.password !== this.state.reTypePass){
                xtraMEssage = "\nPassword and Confirm Password fields did not match!"
            }

            this.setState({
                showModal: true,
                message: 'Please provide email.' + xtraMEssage,
                enabled: 'none'
            });
        }else if(this.state.password.length <=0){
            this.setState({
                showModal: true,
                message: 'Please provide password.',
                enabled: 'none'
            });
        }else if(this.state.reTypePass.length <= 0){
            this.setState({
                showModal: true,
                message: 'Confirm Password must not be blank.',
                enabled: 'none'
            }); 
        }else if((this.state.password !== this.state.reTypePass) && this.state.email.length > 0){
            this.setState({
                showModal: true,
                message: 'Password and Confirm Password fields did not match!',
                enabled: 'none'
            });
        }else if(this.state.nickName.length <= 0){
            this.setState({
                showModal: true,
                message:'Please provide nickname.',
                enabled: 'none'
            })
        }else{
            // save was transfered to other component
            // await this.save();
            // await this.setState({showFormModal: true});


            
            // invoke clickable in profile
            this.setState({enabled: 'auto', enabledUser: 'none'},this.props.resetErrorMessage())

        }
          
    }

    emmailValidation = () => {
        
        this.props.checkEmailFormat(this.state)

    }

    clearForm =e=>{
        this.setState({
            email: '',
            password: '',
            reTypePass: '',
            nickName: ''
        })
    }

    render(){
        let messageAPI = this.props.errorMessage + this.props.customMessage;
        let header = 'Error(s) while saving';

        if(this.props.errorMessage === '' ) header = '';
        

        return(
            <div id="outline">
                <Modal open={this.state.showFormModal} header={header} message={messageAPI} stateFunction = {this.messagemodal}/>
                <Modal open={this.state.showModal} header={'Mandatory Fields'} message={this.state.message} stateFunction = {this.appleUpdate}/>
                <Table>
                    <FormGroup>
                        <Label>EMAIL</Label>
                        <Input type="text" value={this.state.email} onChange={this.emailChange} onBlur={this.emmailValidation} autoFocus/>
                    </FormGroup>
                    <FormGroup>
                        <Label>PASSWORD</Label>
                        <Input type="password" value={this.state.password} onChange={this.passwordChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>CONFIRM PASSWORD</Label>
                        <Input type="password" value={this.state.reTypePass} onChange={this.retypePassword}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>NICKNAME</Label>
                        <Input type="text" value={this.state.nickName} onChange={this.nickNameChange}/>
                    </FormGroup>
                    <Button color="primary" type="text" onClick={async(e) => {await this.submitForm(); await this.props.propToTab(this.state)}} >Next ...</Button> &nbsp;
                    <Button type="text" onClick={this.clearForm}>Clear Fields</Button>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => 
    bindActionCreators({checkEmailFormat,resetErrorMessage}, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);