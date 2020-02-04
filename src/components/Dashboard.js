import React, { useContext } from 'react';

import { Context } from '../contexts/context';

import Spinner from './layout/Spinner';
import Notifications from './Notifications';
import ProjectList from './projects/ProjectList';

const Dashboard = () => {
  const { state } = useContext(Context);
  const { auth } = state;

  return (
    <>
      {!auth.isLoading ? (
        auth.user.uid ? (
          <div className='row pb-4'>
            <ProjectList />
            <Notifications />
          </div>
        ) : (
          <h4 className='pb-5 text-center'>Please sign in</h4>
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Dashboard;
