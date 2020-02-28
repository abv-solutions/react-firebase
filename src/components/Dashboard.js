import React, { useContext, useEffect } from 'react';

import { Context } from '../context/globalState';

import Spinner from './layout/Spinner';
import Notifications from './Notifications';
import ProjectList from './projects/ProjectList';

const Dashboard = props => {
  const { state } = useContext(Context);
  const { auth } = state;

  useEffect(() => {
    !auth.user && props.history.push('/login');
    // eslint-disable-next-line
  }, [auth.user]);

  return (
    <>
      {!auth.isLoading && auth.user ? (
        <div className='row pb-4'>
          <ProjectList />
          <Notifications />
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Dashboard;
