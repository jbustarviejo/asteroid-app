import React from 'react';
import './style.css';

const Loading: React.FC = () => {
  return (
    <div className='loading-background'>
      <p className='loading-text'>Loading ...</p>
      <p className='loading-subtext'>- Please wait -</p>
    </div>
  );
};

export default Loading;
