import React, { useState, useContext } from 'react';

import { Context } from '../../contexts/context';
import { createProject } from '../../actions/actions';

const CreateProject = props => {
  const { dispatch } = useContext(Context);

  const [localState, setState] = useState({
    author: 'Andrei',
    title: '',
    content: '',
    vTitle: 'form-control',
    vContent: 'form-control'
  });

  const onChange = e => {
    setState({
      ...localState,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { author, title, content } = localState;
    const newProject = {
      author,
      title,
      content
    };

    if (title === '' || content === '') {
      validate();
    } else {
      createProject(newProject, dispatch);
      props.history.push('/');
    }
  };

  const validate = () => {
    let vT, vC;
    vT = vC = 'form-control is-valid';
    const { title, content } = localState;

    if (title === '' && content === '') {
      vT = vC = 'form-control is-invalid';
    } else if (title !== '') {
      vC = 'form-control is-invalid';
    } else {
      vT = 'form-control is-invalid';
    }

    setState({
      ...localState,
      vTitle: vT,
      vContent: vC
    });
  };

  return (
    <>
      <h4 className='mb-4 text-center'>Create Project</h4>
      <form
        className='col-lg-8 col-md-10 mx-auto py-3 border rounded'
        onSubmit={onSubmit}
      >
        <div className='form-group'>
          <label>Title</label>
          <input
            type='text'
            name='title'
            className={localState.vTitle}
            placeholder='Enter project title'
            onChange={onChange}
          ></input>
        </div>
        <div className='form-group'>
          <label>Content</label>
          <textarea
            type='text'
            name='content'
            className={localState.vContent}
            placeholder='Enter project content'
            rows='4'
            onChange={onChange}
          ></textarea>
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
