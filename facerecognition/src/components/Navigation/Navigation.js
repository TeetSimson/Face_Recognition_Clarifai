import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
        if(isSignedIn) { // If user is signed in display sign out only
            return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className="f3 link dim white pa4 pointer">Sign Out</p>
            </nav>
            )
        } else {
            return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim white pa4 pointer">Sign In</p>
                <p onClick={() => onRouteChange('register')} className="f3 link dim white pa4 pointer">Register</p>
            </nav>
            )
        } 
} 

export default Navigation;