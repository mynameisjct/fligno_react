import React from 'react';
import './card.css';

const Header = (props) => {

    return(
        <div className="headerstyle">
            {props.headerText} Sample Header
        </div>
    );
}

export default Header;