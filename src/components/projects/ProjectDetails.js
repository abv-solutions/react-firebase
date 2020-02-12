import React, { useState, useContext, useEffect } from 'react';

import { Context } from '../../contexts/context';
import { deleteProject } from '../../actions/projectActions';

import Spinner from '../layout/Spinner';

const ProjectDetails = props => {
  const { state, dispatch } = useContext(Context);
  const { project, auth } = state;
  const [localState, setState] = useState({
    author: '',
    title: '',
    content: ''
  });

  useEffect(() => {
    !auth.user && props.history.push('/login');
    // eslint-disable-next-line
  }, [auth.user]);

  useEffect(() => {
    !project.isLoading &&
      project.projects.forEach(({ id, author, title, content }) => {
        if (id === props.match.params.id) {
          setState({
            author,
            title,
            content
          });
        }
      });
    // eslint-disable-next-line
  }, [project]);

  const onDeleteClick = id => {
    deleteProject(id, dispatch);
    props.history.push('/');
  };

  const onEditClick = id => {
    props.history.push(`/edit/${id}`);
  };

  return (
    <>
      {!auth.isLoading && !project.isLoading && auth.user ? (
        <div className='col-12 mx-auto border rounded p-4 mb-5'>
          <h4 className='mb-4'>Project Details</h4>
          <h5 className='mb-3 text-info'>{localState.title}</h5>
          <p>{localState.content}</p>
          <hr />
          <p>
            <strong>Posted by&nbsp;</strong>
            {localState.author}
          </p>
          <p>3rd September, 4pm</p>
          <button
            className='btn btn-info mr-3'
            onClick={() => onEditClick(props.match.params.id)}
          >
            Edit
          </button>
          <button
            className='btn btn-danger'
            onClick={() => onDeleteClick(props.match.params.id)}
          >
            Delete
          </button>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ProjectDetails;
