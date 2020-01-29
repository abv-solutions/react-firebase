import React, { useState, useContext, useEffect } from 'react';

import { Context } from '../../contexts/context';

const EditProject = props => {
  const { state } = useContext(Context);
  const { project } = state;

  const [localState, setState] = useState({
    author: '',
    title: '',
    content: '',
    vTitle: 'form-control',
    vContent: 'form-control'
  });

  useEffect(() => {
    project.projects.forEach(({ id, author, title, content }) => {
      if (id === props.match.params.id) {
        setState({
          ...localState,
          author,
          title,
          content
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    setState({
      ...localState,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { title, content } = localState;

    if (title === '' || content === '') {
      validate();
    } else {
      props.history.push(`/project/${props.match.params.id}`);
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
      <h4 className='mb-4 text-center'>Edit Project</h4>
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
            value={localState.title}
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
            value={localState.content}
            onChange={onChange}
          ></textarea>
        </div>
        <input
          type='submit'
          value='Edit'
          className='btn btn-dark btn-block mt-4'
        ></input>
      </form>
    </>
  );
};

export default EditProject;
