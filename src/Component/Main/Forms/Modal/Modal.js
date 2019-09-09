import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Button } from 'reactstrap';


class PopUp extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: this.props.open,
        };

        this.toggle.bind(this);
    }

    toggle = () => {
        this.setState( prevState => ({
            open: !prevState.open
        }));
    }



    componentWillReceiveProps(nextProps){

        let nxtProps = nextProps.open;
        let crrProps = this.props.open;

        if(nxtProps !== crrProps){
         
            this.setState({open: nxtProps});
        }
    }

    render(){
        // props is 'message'
        let message = this.props.message !== '' ? this.props.message.split("\n").map((item,i) => <p key={i} style={style.error}>{item}</p>) : '';
        let header = this.props.header;
        let flag = '';

        if(header.length <= 1){
            flag = 'clearForm'
        }

        console.log('this is my flag: ' + flag)
        return(
            <div>
                <Modal isOpen={this.state.open} >
                    <ModalHeader>
                        <p>{header}</p>
                    </ModalHeader>
                        <ModalBody>
                            {message}
                        </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick = {(e) => {this.props.stateFunction(flag) ; this.toggle();}}>Close</Button>
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

export default PopUp