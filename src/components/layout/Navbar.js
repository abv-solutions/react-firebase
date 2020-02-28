import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../../context/globalState';
import { getProjects } from '../../actions/projectActions';
import { getUser, logout } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { getLogs } from '../../actions/logActions';

const Navbar = () => {
  const { state, dispatch } = useContext(Context);
  const { project, auth, log } = state;

  useEffect(() => {
    !auth.isListening && getUser(dispatch);
    !log.isListening && auth.user && getLogs(log.logs, dispatch);
    !project.isListening &&
      auth.user &&
      getProjects(project.projects, dispatch);
    // eslint-disable-next-line
  }, [auth.user]);

  const onClick = () => {
    clearErrors(dispatch);
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
          {auth.user && auth.user.initials}
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
