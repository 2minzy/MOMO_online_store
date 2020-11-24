import React from 'react';
import loadingGif from '../images/Loading.gif';

const Loader = () => {
  return <img src={loadingGif} className='loading' alt='Loading' />;
};

export default Loader;
