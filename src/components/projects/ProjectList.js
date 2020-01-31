import React, { useContext, useEffect } from 'react';

import { Context } from '../../contexts/context';
import { getProjects } from '../../actions/projectActions';
import { getUser } from '../../actions/authActions';

import Project from '../projects/Project';

const ProjectList = () => {
  const { state, dispatch } = useContext(Context);
  const { project, auth } = state;

  useEffect(() => {
    if (!project.isListening) {
      getProjects(project.projects, dispatch);
    }
    if (!auth.isListening) {
      getUser(dispatch);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className='col-md-6'>
        <h4 className='mb-4 text-center'>Projects</h4>
        {project.projects.map(project => (
          <Project project={project} key={project.id} />
        ))}
      </div>
    </>
  );
};

export default ProjectList;
