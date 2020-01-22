import React, { useState, useContext, useEffect } from 'react';

import { Context } from '../../contexts/context';

const ProjectDetails = props => {
  const { state } = useContext(Context);
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
    </div>
  );
};

export default ProjectDetails;
