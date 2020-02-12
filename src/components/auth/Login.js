import React, { useState, useContext, useEffect } from 'react';

import { Context } from '../../contexts/context';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import Spinner from '../layout/Spinner';

const Login = props => {
  const { state, dispatch } = useContext(Context);
  const { project, auth, error } = state;
  const [localState, setState] = useState({
    email: '',
    password: '',
    vEmail: 'form-control',
    vPassword: 'form-control'
  });

  useEffect(() => {
    clearErrors(dispatch);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    !error.code && auth.user && props.history.goBack();
    // eslint-disable-next-line
  }, [auth.user]);

  const onChange = e => {
    setState({
      ...localState,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { email, password } = localState;
    const user = {
      email,
      password
    };

    if (email === '' || password === '') {
      validate();
    } else {
      clearErrors(dispatch);
      login(user, dispatch);
      setState({
        ...localState,
        email: '',
        password: '',
        vEmail: 'form-control',
        vPassword: 'form-control'
      });
    }
  };

  const validate = () => {
    const { email, password } = localState;
    setState({
      ...localState,
      vEmail:
        email === '' ? 'form-control is-invalid' : 'form-control is-valid',
      vPassword:
        password === '' ? 'form-control is-invalid' : 'form-control is-valid'
    });
  };

  return (
    <>
      {!auth.isLoading && !project.isLoading && !auth.user ? (
        <>
          <h4 className='mb-4 text-center'>Sign In</h4>
          <form
            className='col-lg-8 col-md-10 mx-auto py-3 mb-5 border rounded'
            onSubmit={onSubmit}
          >
            <div className='form-group'>
              <label>Email</label>
              <input
                type='text'
                name='email'
                className={localState.vEmail}
                placeholder='Enter your email'
                autoComplete='username'
                onChange={onChange}
              ></input>
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input
                type='password'
                name='password'
                className={localState.vPassword}
                placeholder='Enter your password'
                autoComplete='current-password'
                onChange={onChange}
              ></input>
            </div>
            <input
              type='submit'
              value='Login'
              className='btn btn-dark btn-block mt-4'
            ></input>
            {error.code && (
              <div class='alert alert-danger text-center mt-4'>{error.msg}</div>
            )}
          </form>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Login;
