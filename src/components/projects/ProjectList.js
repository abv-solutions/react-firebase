import React, { useContext } from 'react';

import { Context } from '../../contexts/context';

import Spinner from '../layout/Spinner';
import Project from '../projects/Project';

const ProjectList = () => {
  const { state } = useContext(Context);
  const { project } = state;

  return (
    <>
      <div className='col-md-6'>
        <h4 className='mb-4 text-center'>Projects</h4>
        {!project.isLoading ? (
          project.projects &&
          project.projects.map(project => (
            <Project project={project} key={project.id} />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default ProjectList;
