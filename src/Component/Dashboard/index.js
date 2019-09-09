import React, {Component} from 'react';
import {connect} from 'react-redux';
import CoverPhoto from '../Dashboard/Top/CoverPhoto.js';

class Dashboard extends Component{
    render(){
        return(
            <div>
                <CoverPhoto />
            </div>
        );
    }
}

const mapStateToProps = state => {return state};

export default connect(mapStateToProps)(Dashboard);