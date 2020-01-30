import React from 'react';

import Notifications from './Notifications';
import ProjectList from './projects/ProjectList';

const Dashboard = () => {
  return (
    <div className='row pb-4'>
      <ProjectList />
      <Notifications />
    </div>
  );
};

export default Dashboard;
