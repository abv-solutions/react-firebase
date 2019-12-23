import React, { useContext, useEffect } from 'react';

import { Context } from '../contexts/context';
import { getData } from '../actions/actions';

const Index = () => {
  const { dispatch } = useContext(Context);

  // Get items
  useEffect(() => {
    getData(dispatch);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className='container'>
        <i className='fas fa-music' />
        <p>Index</p>
      </div>
    </>
  );
};

export default Index;
