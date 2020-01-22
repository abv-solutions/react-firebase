import React from 'react';

import Notifications from './Notifications';
import ProjectList from './projects/ProjectList';

const Dashboard = () => {
  return (
    <div className='row mb-5 pb-5'>
      <ProjectList />
      <Notifications />
    </div>
  );
};

export default Dashboard;
