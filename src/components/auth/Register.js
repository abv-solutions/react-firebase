import React, { useState, useContext, useEffect } from 'react';

import { Context } from '../../contexts/context';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import Spinner from '../layout/Spinner';

const Register = props => {
  const { state, dispatch } = useContext(Context);
  const { auth, error } = state;
  const [localState, setState] = useState({
    name: '',
    email: '',
    password: '',
    vName: 'form-control',
    vEmail: 'form-control',
    vPassword: 'form-control'
  });

  useEffect(() => {
    !error.code && auth.user && props.history.push('/');
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
    const { name, email, password } = localState;
    const newUser = {
      name,
      email,
      password
    };
    if (name === '' || email === '' || password === '') {
      validate();
    } else {
      clearErrors(dispatch);
      register(newUser, dispatch);
      setState({
        name: '',
        email: '',
        password: '',
        vName: 'form-control',
        vEmail: 'form-control',
        vPassword: 'form-control'
      });
    }
  };

  const validate = () => {
    const { name, email, password } = localState;
    setState({
      ...localState,
      vName: name === '' ? 'form-control is-invalid' : 'form-control is-valid',
      vEmail:
        email === '' ? 'form-control is-invalid' : 'form-control is-valid',
      vPassword:
        password === '' ? 'form-control is-invalid' : 'form-control is-valid'
    });
  };

  return (
    <>
      {!auth.isLoading ? (
        <>
          <h4 className='mb-4 text-center'>Sign Up</h4>
          <form
            className='col-lg-8 col-md-10 mx-auto py-3 mb-5 border rounded'
            onSubmit={onSubmit}
          >
            <div className='form-group'>
              <label>Name</label>
              <input
                type='text'
                name='name'
                className={localState.vName}
                placeholder='Enter your name'
                onChange={onChange}
              ></input>
            </div>
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
              value='Register'
              className='btn btn-dark btn-block mt-4'
            ></input>
          </form>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Register;
