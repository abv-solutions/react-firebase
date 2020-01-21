import React from 'react';

const Login = props => {
  const onSubmit = e => {
    e.preventDefault();
    props.history.push('/');
  };

  return (
    <>
      <h4 className='mb-4 text-center'>Sign In</h4>
      <form
        className='col-lg-8 col-md-10 mx-auto py-3 border rounded'
        onSubmit={onSubmit}
      >
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            className='form-control'
            placeholder='Enter your email'
            autoComplete='username'
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            className='form-control'
            placeholder='Enter your password'
            autoComplete='current-password'
          ></input>
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-dark btn-block mt-4'
        ></input>
      </form>
    </>
  );
};

export default Login;