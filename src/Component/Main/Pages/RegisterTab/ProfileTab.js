import React, {Component} from 'react';
import {Button, Label, Input, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Form, FormText, ButtonGroup} from 'reactstrap';
import ImageModal from '../../Forms/Modal/ImageModal';
import Modal from '../../Forms/Modal/Modal';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {save} from '../../../../Action/RegisterActions';
import {resetErrorMessage} from '../../../../Action/CommonActions';

// get endpoints destination
import apiAddress from '../../../../API/destination';
import {retrieve_PP,retrieve_CP,clearPP,clearCP} from '../../../../Action/PictureActions';
import _ from 'lodash';

class ProfileTab extends Component{
    constructor(props){
        super(props);

        this.state ={
            showModal: false,
            showModalCover: false,
            profile_picture: null,
            cover_photo: null,
            showFormModal: false,
            header: '',
            message: '',
            lastname: '',
            firstname: '',
            middlename: '',
            description: '',
            // email: this.props.user
        }

        this.cancel.bind(this)

        //modal
        this.formModal.bind(this);
        this.appleUpdate.bind(this);
        this.coverPhotoModal.bind(this);
    }

    formModal = () => {
        this.setState({ showFormModal: !this.state.showFormModal});
    }

    appleUpdate = () => {
        this.setState({ showModal: !this.state.showModal});
    }

    coverPhotoModal = () => {
        this.setState({ showModalCover: !this.state.showModalCover});
    }

    cancel = async () =>{
        await this.props.disableProfileTab('none')
        await this.props.history.push("/Register/User")
    }

    /* form handlers */

    onLnameChange = (e) => {
        this.setState({lastname:e.target.value})
    }

    onFnameChange = (e) => {
        this.setState({firstname:e.target.value})
    }

    onMnameChange = (e) => {
        this.setState({middlename:e.target.value})
    }

    onDescriptionChange = (e) => {
        this.setState({description:e.target.value})
    }

    save = async () => {
        // check for history objects
        const data = this.props.history.location.formData

        if(data !== undefined && !_.isEmpty(data)){

            const {email,nickName,password} = this.props.history.location.formData;
            const {profile_picture,cover_photo,lastname,firstname,middlename,description} = this.state

            //check for undefined fields

            if(lastname.length <= 0){
                this.setState({
                    showFormModal: true,
                    header: 'Error(s) encountered while saving!.',
                    message: 'Please input your lastname',
                })
            }else if(firstname.length <= 0){
                this.setState({
                    showFormModal: true,
                    header: 'Error(s) encountered while saving!.',
                    message: 'Please input your firstname',
               })
            }else if(middlename.length <= 0){
                this.setState({
                    showFormModal: true,
                    header: 'Error(s) encountered while saving!.',
                    message: 'Please input your middlename',
                })
            }else if(description.length <= 0){
                this.setState({
                    showFormModal: true,
                    header: 'Error(s) encountered while saving!.',
                    message: 'Please tell me more about you',
                })
            }else if(profile_picture === null || cover_photo === null){
                this.setState({
                    showFormModal: true,
                    header: 'Error(s) encountered while saving!.',
                    message: 'Please select and upload your profile and cover photo!',
                })
            }else{
                // perform save
                await this.props.save({
                    email: email,
                    name: nickName,
                    password: password,
                    lastname: lastname,
                    firstname: firstname,
                    middlename: middlename,
                    description: description,
                    pp: profile_picture,
                    cp: cover_photo
                })

                this.setState({
                    showFormModal: true,
                    header: '',
                    message: 'Profile has been saved!',
                }, this.clearForm())
            }
        }else{
            this.setState({
                showFormModal: true,
                header: 'Error(s) encountered while saving!.',
                message: 'Please setup user login first.',
            })
        }
    }

    componentDidUpdate(prevProps){

        const {tempProfilePicture,tempCoverPhoto} = this.props
        const prevPPPath = prevProps.pofilePicture
        const currPPPath = this.props.pofilePicture
        const prevCPPath = prevProps.coverPhoto
        const currCPPath = this.props.coverPhoto
        const prevErr = prevProps.errorMessage
        const currErr = this.props.errorMessage

        // if(prevPPPath !== currPPPath){
        //     this.setState({profile_picture: apiAddress.picAPI + currPPPath})
        // }

        // if(prevCPPath !== currCPPath){
        //     this.setState({cover_photo: apiAddress.picAPI + currCPPath})
        // }

        if(prevPPPath !== currPPPath){
            this.setState({profile_picture: tempProfilePicture})
        }

        if(prevCPPath !== currCPPath){
            this.setState({cover_photo: tempCoverPhoto})
        }

        if(prevErr !== currErr){
            if(currErr !== ''){

            }

            this.setState({
                showFormModal: true,
                header: 'Error(s) encountered while saving!.',
                message: currErr,
            }, this.props.resetErrorMessage())
        }
    }

    clearForm(){
        this.setState({
            profile_picture: null,
            cover_photo: null,
            header: '',
            message: '',
            lastname: '',
            firstname: '',
            middlename: '',
            description: '',
        })
        // this.props.clearPP('')
        // this.props.clearCP('')
    }

    render(){
        const {profile_picture, cover_photo, header, message} = this.state

        var profile = (profile_picture === null && _.isEmpty(profile_picture)) ? '' : profile_picture.source
        var cover = (cover_photo === null && _.isEmpty(cover_photo)) ? '' : cover_photo.source

        console.log('loading cover: ',this.props)
        return(
            <div>
                <div style={styles.container}>
                <Modal open={this.state.showFormModal} header={header} message={message} stateFunction = {this.formModal}/>

                <ImageModal type={'profile'} open={this.state.showModal} stateFunction = {this.appleUpdate} />
                <ImageModal type={'cover'} open={this.state.showModalCover} stateFunction = {this.coverPhotoModal} />
                    <Form>
                        <FormGroup>
                            <FormText>Setup your profile information!</FormText>
                            <Label>Your Name</Label>
                            <InputGroup style={styles.inputGroup}>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>Lastname</InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" name="lastname" placeholder="" onChange={this.onLnameChange} value={this.state.lastname} />
                            </InputGroup>
                            <InputGroup style={styles.inputGroup}>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>Firstname</InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" name="firstname" placeholder="" onChange={this.onFnameChange} value={this.state.firstname}/>
                            </InputGroup>
                            <InputGroup style={styles.inputGroup}>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>Middlename / Initial</InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" name="middlename" placeholder="" onChange={this.onMnameChange} value={this.state.middlename}/>
                            </InputGroup>

                            <Label style={styles.label}>Describe Yourself</Label>
                            <InputGroup>
                                <Input type="textarea" name="description" placeholder="More about you." onChange={this.onDescriptionChange} value={this.state.description}/>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                   
                    <Form style={styles.leftItems}>
                        <FormText>Customize your profile more!</FormText>
                        <table>
                            <th>
                                <Button color="primary" onClick={this.appleUpdate}>Upload Profile Picture</Button><br/>
                                {/* change source to state*/}
                                <img src={profile} alt={'no image uploaded'} style={{ width: 180, height: 180, border: '1px dotted black'}}/>
                            </th>
                            <th style={{paddingLeft: 20}}>
                                <Button color="primary" onClick={this.coverPhotoModal}>Upload Cover Photo</Button><br/>
                                {/* change source to state*/}
                                <img src={cover} alt={'no image uploaded'} style={{ width: 180, height: 180, border: '1px dotted black'}}/>
                            </th>
                        </table>
                    </Form>
                </div>
                <ButtonGroup>
                    <Button color="primary" onClick={this.save}>Save</Button>
                    <Button color="danger" onClick={this.cancel}>Cancel</Button>
                </ButtonGroup>
            </div>

        );
    }
}

const styles = {
    inputGroup : {
        paddingTop: 5
    },
    label : {
        paddingTop: 10
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    leftItems : {
        paddingLeft: 20,
        width: 600,
        height: 300 ,
        border: '0px solid red',
    }
}

const mapStateToProps = state => {
    return state;
}
const mapDispatchToProps = dispatch =>
    bindActionCreators({save,resetErrorMessage, retrieve_CP, retrieve_PP,clearPP,clearCP}, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(ProfileTab);