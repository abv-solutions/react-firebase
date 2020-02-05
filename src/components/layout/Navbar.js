import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../../contexts/context';
import { getProjects } from '../../actions/projectActions';
import { getUser, logout } from '../../actions/authActions';

const Navbar = () => {
  const { state, dispatch } = useContext(Context);
  const { project, auth } = state;

  useEffect(() => {
    !auth.isListening && getUser(dispatch);
    !project.isListening &&
      auth.user &&
      getProjects(project.projects, dispatch);
    // eslint-disable-next-line
  }, [auth.user]);

  const onClick = () => {
    logout(dispatch);
  };
  const guestLinks = (
    <>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>
          Register
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      </li>
    </>
  );

  const authLinks = (
    <>
      <li className='nav-item'>
        <Link className='nav-link' to='/create'>
          New Project
        </Link>
      </li>
      <li className='nav-item'>
        <Link onClick={onClick} className='nav-link' to='/'>
          Logout
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='btn btn-info btn-circle' to='/'>
          AS
        </Link>
      </li>
    </>
  );

  return (
    <>
      <nav className='navbar navbar-dark bg-dark navbar-expand-sm mb-5'>
        <div className='container'>
          <Link to='/' className='navbar-brand'>
            Project Planner
          </Link>

          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNavDropdown'
            aria-controls='navbarNavDropdown'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav ml-auto'>
              {!auth.isLoading ? (auth.user ? authLinks : guestLinks) : null}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
