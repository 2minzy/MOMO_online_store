import React from 'react';

const Loader = () => {
  return (
    <img
      src={process.env.PUBLIC_URL + '/images/Loading.gif'}
      className='loading'
      alt='Loading'
    />
  );
};

export default Loader;
