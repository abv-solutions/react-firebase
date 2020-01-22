import React, { useContext, useEffect } from 'react';

import { Context } from '../../contexts/context';
import { getProjects, deleteProject } from '../../actions/actions';

import Project from '../projects/Project';

const ProjectList = () => {
  const { state, dispatch } = useContext(Context);
  const { project } = state;

  useEffect(() => {
    if (!project.isListening) {
      getProjects(project.projects, dispatch);
    }
    // eslint-disable-next-line
  }, []);

  const onDeleteClick = id => {
    deleteProject(id, dispatch);
  };

  return (
    <>
      <div className='col-md-6'>
        <button
          className='btn btn-danger'
          onClick={() => onDeleteClick('iYjZL74PDBQF0kCIS5aA')}
        >
          X
        </button>
        <h4 className='mb-4 text-center'>Projects</h4>
        {project.projects.map(project => (
          <Project project={project} key={project.id} />
        ))}
      </div>
    </>
  );
};

export default ProjectList;
