import React, { useContext } from 'react';

import { Context } from '../contexts/context';

import Spinner from './layout/Spinner';

const Notifications = () => {
  const { state } = useContext(Context);
  const { log } = state;

  return (
    <div className='col-md-6'>
      <h4 className='mb-4 text-center'>Notifications</h4>
      <ul className='list-group' style={{ WebkitUserSelect: 'none' }}>
        {!log.isLoading ? (
          log.logs &&
          log.logs.map(log => (
            <li key={log.id} className='list-group-item list-group-item-info'>
              <i className='fas fa-bell'></i>
              <small>
                <span className='font-weight-bold px-1'>{log.user}</span>
                {log.content}
              </small>
            </li>
          ))
        ) : (
          <Spinner />
        )}
      </ul>
    </div>
  );
};

export default Notifications;
