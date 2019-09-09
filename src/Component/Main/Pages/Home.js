import React, {Component} from 'react';
import '../index.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchProfiles, deleteProfiles} from '../../../Action/ProfileActions';
import {resetErrorMessage, errorMessaage} from '../../../Action/CommonActions';
import {Card,CardHeader,CardBody,CardFooter,FormText,Input, Button} from 'reactstrap';
import apiAddress from '../../../API/destination';
import Modal from '../Forms/Modal/Modal';

class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            profileData: [],
            options: [],
            show: false,
            header: '',
            message: '',
        }
        this.getChecked.bind(this)
        this.handeleDelete.bind(this)
        this.appleUpdate.bind(this);
    }   

    appleUpdate = () => {
        this.setState({ show: !this.state.show});
    }

    handeleDelete = async() =>{
        const {options} = this.state

        if(options && options.length <= 0){
            this.setState({ show: true});
        }else{
            console.log('selected ',JSON.stringify(options))
            await this.props.deleteProfiles(options)
            await this.getProfiles()
        }
    }

    getChecked = e => {
        const {options} = this.state
        let index
        
        if(e.target.checked){
            options.push(+e.target.value)
        }else{
            index = options.indexOf(+e.target.value)
            options.splice(index,1)
        }

        this.setState({
            options: options
        })
    }

    getProfiles = (e) =>{
        this.props.fetchProfiles()
    }

    componentDidMount(){
         this.getProfiles();
    }

    componentDidUpdate(prevProps){
        if(this.props.profile_data !== prevProps.profile_data){
            const data = this.props.profile_data
            this.setState({
                profileData: data,
                message: 'Error(s) encountered while deleting'
            })
        }
    }

    componentWillReceiveProps(prevProps){
        const prevData = prevProps.profile_data;
        const currData = this.props.profile_data;
        const prevErr = prevProps.errorMessage
        const currErr = this.props.errorMessage

        if(prevErr !== currErr){
            if(currErr !== ''){

            }

            this.setState({
                showFormModal: true,
            }, this.props.resetErrorMessage())
        }
    }

    render(){

        console.log('my checked', this.state.options)

        const {profileData,message} = this.state
        const {loadmask, customMessage,errorMessage} = this.props
        
        return(
            <div>
                <Modal open={this.state.show} header={''} message={message} stateFunction = {this.appleUpdate}/>
                <button type="text" onClick={this.handeleDelete}>Delete selected</button><br/><br/>
                    {
                        loadmask?
                        'Loading... '
                        :
                        profileData.length > 0?
                        
                        profileData.map(profile => {
                        
                        return(
                            <div key={profile.id}>
                                <Card style={{width: 600, height: 650}}>
                                <Input type="checkbox" value={profile.id} onChange={this.getChecked}/>
                                    <CardBody style={{position: 'relative'}}>
                                        <div style={{zIndex:1,left: '20%', display:'block',margin: 'auto',border: '1px dotted black', width: '20%', height: '20', top: '10%'}}>
                                            <img src={`${apiAddress.url}${profile.pp_path}`} width={'100%'} height={'100%'} />
                                        </div>
                                        <img src={`${apiAddress.url}${profile.pp_cover_path}`} width={'100%'} height={'50%'} alt={'Profile picture not loaded'}/>
                                        <CardFooter>
                                        <FormText style={{color: 'white'}}>
                                            Name: {`${profile.firstname} ${profile.middlename} ${profile.lastname}`} <br/>
                                            Email: {profile.email} <br/>
                                            More about me: {profile.description}<br/>
                                        </FormText>
                                    </CardFooter>
                                    </CardBody>
                                </Card>
                                <br/>
                            </div>
                            )
                            // return <p>{profile.lastname}</p>
                        })
                        :
                        'No Profiles to show, please register.'
                    }
            </div>
        );
    }
    
}

const mapStateToProps = state => {return state}
const mapDispatchToProps = dispatch => bindActionCreators({fetchProfiles,deleteProfiles,resetErrorMessage},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Home);


          {/* <div className="displaycard">
                 <div>
                     <h2>About Absolute Network Solutions</h2>
                     <p>The thing is, this app is just a product of mind and just for an example.</p>
                 </div>
                 <div>
                     <Card/>
                 </div>
            </div> */}