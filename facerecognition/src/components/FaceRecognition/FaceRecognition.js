import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, boxes }) => {
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputImage" alt="Result" src={imageURL} width='500px' height='auto'/>
                {   
                    boxes.map((box, i) => { // Every face gets a box, sorry
                        return (<div key={i} className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>);
                    })
                }
            </div>
        </div>
    )
} 

export default FaceRecognition;