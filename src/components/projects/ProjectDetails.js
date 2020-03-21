import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';

import { Context } from '../../context/globalState';
import { deleteProject } from '../../actions/projectActions';
import { uploadFile } from '../../actions/fileActions';
import { clearErrors, sendErrors } from '../../actions/errorActions';

import Spinner from '../layout/Spinner';

const ProjectDetails = props => {
  const { state, dispatch } = useContext(Context);
  const { project, auth, error } = state;
  const [localState, setState] = useState({
    author: '',
    authorID: '',
    title: '',
    content: '',
    createdAt: '',
    files: [],
    file: null,
    fileName: 'Upload a file'
  });

  useEffect(() => {
    clearErrors(dispatch);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    !auth.user && props.history.push('/login');
    // eslint-disable-next-line
  }, [auth.user]);

  useEffect(() => {
    !project.isLoading &&
      project.projects.forEach(
        ({ id, author, authorID, title, content, createdAt, files }) => {
          if (id === props.match.params.id) {
            setState({
              ...localState,
              author,
              authorID,
              title,
              content,
              createdAt: moment(createdAt.toDate()).calendar(),
              files
            });
          }
        }
      );
    // eslint-disable-next-line
  }, [project]);

  const onChange = e => {
    const file = e.target.files[0] && e.target.files[0];
    setState({
      ...localState,
      file: file ? file : null,
      fileName: file
        ? file.name.substring(0, file.name.indexOf('.')).substring(0, 12)
        : 'Upload a file'
    });
  };

  const onUploadClick = id => {
    clearErrors(dispatch);
    if (localState.file) {
      localState.file.size / 1024 / 1024 < 15
        ? uploadFile(localState.file, id, dispatch)
        : sendErrors(
            'File size must not exceed 15MB.',
            'storage/unauthorized',
            null,
            dispatch
          );
    }
  };

  const onEditClick = id => {
    props.history.push(`/edit/${id}`);
  };

  const onDeleteClick = id => {
    deleteProject(id, dispatch);
    props.history.push('/');
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
          <p>{localState.createdAt}</p>
          <div>
            {localState.files &&
              localState.files.map((file, i) => (
                <a
                  href={file.url}
                  key={i}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='badge badge-info mr-2'>{file.fileName}</span>
                </a>
              ))}
          </div>
          <hr />
          {auth.user.uid === localState.authorID && (
            <>
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
              {!project.percentage || project.percentage === 0 ? (
                <div className='input-group mt-3'>
                  <div className='input-group-prepend'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      onClick={() => onUploadClick(props.match.params.id)}
                    >
                      Upload
                    </button>
                  </div>
                  <div className='custom-file'>
                    <input
                      type='file'
                      className='custom-file-input'
                      onChange={onChange}
                    ></input>
                    <label className='custom-file-label'>
                      {localState.fileName}
                    </label>
                  </div>
                </div>
              ) : (
                <div className='progress mt-4' style={{ width: '50%' }}>
                  <div
                    className='progress-bar progress-bar-striped bg-info'
                    role='progressbar'
                    aria-valuenow='50'
                    aria-valuemin='0'
                    aria-valuemax='100'
                    style={{ width: `${project.percentage}%` }}
                  ></div>
                </div>
              )}
            </>
          )}
          {error.code && (
            <div className='alert alert-danger text-center mt-4'>
              {error.msg}
            </div>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ProjectDetails;
