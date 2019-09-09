import React, {Component} from 'react';
import {Button} from 'reactstrap';

class Logout extends Component{
    constructor(props){
        super(props);

        this.logoutBtn.bind(this);
    }

    async logoutBtn(){
        await localStorage.clear();
        await window.location.reload();
    }

    render(){
        return(
            <Button onClick={this.logoutBtn}>Logout</Button>
        )
    }
}

export default Logout