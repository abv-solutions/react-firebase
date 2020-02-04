import React, { useState, useContext } from 'react';

import { Context } from '../../contexts/context';
import { login } from '../../actions/authActions';

const Login = props => {
  const { state, dispatch } = useContext(Context);
  const { auth } = state;
  const [localState, setState] = useState({
    email: '',
    password: ''
  });

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

    login(user, dispatch);
    props.history.push('/');
  };

  return (
    <>
      {!auth.isLoading ? (
        !auth.user.uid ? (
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
                  className='form-control'
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
                  className='form-control'
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
            </form>
          </>
        ) : (
          <h4 className='pb-5 text-center'>You are signed in</h4>
        )
      ) : null}
    </>
  );
};

export default Login;
