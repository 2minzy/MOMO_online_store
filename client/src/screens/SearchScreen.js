import React from 'react';
import { Route } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import Meta from '../components/Meta';

const SearchScreen = () => {
  return (
    <>
      <Meta title='Search | MOMO' />
      <Route render={({ history }) => <SearchBox history={history} />} />
    </>
  );
};

export default SearchScreen;
