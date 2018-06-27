import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ box, imageUrl }) => {
  return (
    <div className='flex justify-center ma'>
    <div className='absolute mt2'>
      <img id='inputImage' alt='faces' src={imageUrl} width='500px' height='auto'/>
      <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    </div>
    </div>
  );
}

export default FaceRecognition;