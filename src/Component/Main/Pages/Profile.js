import React, {Component} from 'react';
import {Input, Label} from 'reactstrap';
import ImageDropAndCrop from '../Forms/ImageDropAndCrop';
import ImageForm from '../Forms/ImageForm';

class Profile extends Component{
    render(){
        return(
            <div>
                {/* <h2>View Profile</h2>
                <p>Here displays my profile</p> */}
                {/* <ImageDropAndCrop /> */}
                <ImageForm message={''}/>
            </div>
        );
    }
}

export default Profile;