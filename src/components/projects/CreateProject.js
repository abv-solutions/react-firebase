import React, { useState, useContext } from 'react';

import { Context } from '../../contexts/context';
import { createProject } from '../../actions/actions';

const CreateProject = props => {
  const { dispatch } = useContext(Context);

  const [localState, setState] = useState({
    title: '',
    content: ''
  });

  const onChange = e => {
    setState({
      ...localState,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const newProject = {
      author: 'Andrei',
      content: localState.content,
      title: localState.title
    };
    createProject(newProject, dispatch);
    props.history.push('/');
  };

  return (
    <>
      <h4 className='mb-4 text-center'>Create Project</h4>
      <form
        className='col-lg-8 col-md-10 mx-auto py-3 border rounded'
        onSubmit={onSubmit}
      >
        <div className='form-group'>
          <label htmlFor='name'>Title</label>
          <input
            type='text'
            name='title'
            className='form-control'
            placeholder='Enter project title'
            onChange={onChange}
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Content</label>
          <input
            type='text'
            name='content'
            className='form-control'
            placeholder='Enter project content'
            onChange={onChange}
          ></input>
        </div>
        <input
          type='submit'
          value='Create'
          className='btn btn-dark btn-block mt-4'
        ></input>
      </form>
    </>
  );
};

export default CreateProject;
