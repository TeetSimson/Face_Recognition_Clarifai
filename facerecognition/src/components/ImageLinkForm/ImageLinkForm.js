import React from 'react';
import './ImageLinkForm.css';

// Searchbox with title
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return(
        <div className="ma1">
            <p className="f3 white">
                {'This Magic application will detect faces in your pictures.'}
            </p>
            <div className="center pa4 shadow-5 w-40 form">
                <input className="f4 br3 w-70 center" type='text'onChange={onInputChange}/> 
                <button 
                    className="w-30 scan grow f4 ph3 pv2 dib bg-black br3"
                    onClick={onButtonSubmit}
                >SCAN</button>
            </div>
        </div>
    )
} 

export default ImageLinkForm;