import React, { useState, useContext, useEffect } from 'react';

import { Context } from '../../contexts/context';
import { deleteProject } from '../../actions/actions';

const ProjectDetails = props => {
  const { state, dispatch } = useContext(Context);
  const { project } = state;

  const [localState, setState] = useState({
    author: '',
    title: '',
    content: ''
  });

  useEffect(() => {
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
  }, []);

  const onDeleteClick = id => {
    deleteProject(id, dispatch);
    props.history.push('/');
  };

  const onEditClick = id => {
    props.history.push(`/edit/${props.match.params.id}`);
  };

  return (
    <div className='col-12 mx-auto border rounded p-4'>
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
  );
};

export default ProjectDetails;
