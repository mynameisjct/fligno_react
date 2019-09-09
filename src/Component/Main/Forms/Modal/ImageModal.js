import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
// import ImageDropAndCrop from '../ImageDropAndCrop'; // have many bugs
import ImageForm from '../ImageForm';
import {connect} from 'react-redux';
import { throwStatement } from '@babel/types';

class ImageModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: this.props.open,
            message: ''
        };

        this.toggle.bind(this);
    }

    toggle = () => {
        this.setState( prevState => ({
            open: !prevState.open
        }));
    }

    message = (res) => {
        console.log('mpdal message ', res)
        this.setState({message: res},console.log('data received ',res))
    }


    componentWillReceiveProps(nextProps){

        let nxtProps = nextProps.open;
        let crrProps = this.props.open;

        if(nxtProps !== crrProps){
         
            this.setState({open: nxtProps});
        }
    }

    render(){
        let header_message = this.state.message
        return(
            <div>
                <Modal isOpen={this.state.open} >
                    <ModalHeader>
                        <p>{header_message}</p>
                    </ModalHeader>
                        <ModalBody>
                            <ImageForm message={this.message} type={this.props.type} />
                        </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick = {(e) => {this.props.stateFunction(); this.toggle();}}>Done</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const style = {
    error: {
        color: 'red'
    }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(ImageModal);