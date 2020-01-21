import React from 'react';

const Register = props => {
  const onSubmit = e => {
    e.preventDefault();
    props.history.push('/');
  };

  return (
    <>
      <h4 className='mb-4 text-center'>Sign Up</h4>
      <form
        className='col-lg-8 col-md-10 mx-auto py-3 border rounded'
        onSubmit={onSubmit}
      >
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            className='form-control'
            placeholder='Enter your name'
          ></input>
        </div>
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
          value='Register'
          className='btn btn-dark btn-block mt-4'
        ></input>
      </form>
    </>
  );
};

export default Register;
