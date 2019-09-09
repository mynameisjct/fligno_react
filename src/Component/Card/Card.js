import React from 'react';
import Header from './Header';
import CardSection from './CardSection';
import './card.css';

const Card = (props) => {

    return(
        <div className="cardstyle">
            <Header headerText = {'Header ->'} />
            <CardSection style={{display:'flex',alignItems:'center',justifyContent: 'center'}}/>
        </div>
    );
}

const styles = {

}

export default Card;