import React, { useState } from 'react';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = e => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/shop/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <div className='container nav__search'>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          name='q'
          placeholder='Search products...'
          onChange={e => setKeyword(e.target.value)}
        />
        <button className='nav__search__btn'>
          <strong>SEARCH</strong>
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
