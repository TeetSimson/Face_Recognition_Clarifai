import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import face from './facial-recognition.png';

// Logo wrapped around with Tilt npm package effect
const Logo = () => {
    return(
        <div className="ma4 mt0" style={{marginTop: '-100px'}}>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3"><img style={{paddingTop: '1px'}} src={face} alt="Face logo"></img></div>
            </Tilt>
        </div>
    )
} 

export default Logo;