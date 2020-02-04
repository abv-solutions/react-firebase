import React, { useState, useContext, useEffect } from 'react';

import { Context } from '../../contexts/context';
import { editProject } from '../../actions/projectActions';

const EditProject = props => {
  const { state, dispatch } = useContext(Context);
  const { project, auth } = state;
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
    const project = {
      id: props.match.params.id,
      title,
      content
    };

    if (title === '' || content === '') {
      validate();
    } else {
      editProject(project, dispatch);
      props.history.push(`/project/${props.match.params.id}`);
    }
  };

  const validate = () => {
    const { title, content } = localState;
    setState({
      ...localState,
      vTitle:
        title === '' ? 'form-control is-invalid' : 'form-control is-valid',
      vContent:
        content === '' ? 'form-control is-invalid' : 'form-control is-valid'
    });
  };

  return (
    <>
      {!auth.isLoading ? (
        auth.user.uid ? (
          <>
            <h4 className='mb-4 text-center'>Edit Project</h4>
            <form
              className='col-lg-8 col-md-10 mx-auto py-3 mb-5 border rounded'
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
        ) : (
          <h4 className='pb-5 text-center'>Please sign in to edit projects</h4>
        )
      ) : null}
    </>
  );
};

export default EditProject;
