import React from 'react';
import { Route } from 'react-router-dom';
import SearchBox from '../components/SearchBox';

const SearchScreen = () => {
  return (
    <>
      <Route render={({ history }) => <SearchBox history={history} />} />
    </>
  );
};

export default SearchScreen;
