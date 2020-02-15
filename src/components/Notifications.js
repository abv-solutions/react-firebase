import React, { useContext } from 'react';

import { Context } from '../contexts/context';

import Spinner from './layout/Spinner';

const Notifications = () => {
  const { state } = useContext(Context);
  const { log } = state;

  return (
    <div className='col-md-5'>
      <h4 className='mb-4 text-center'>Notifications</h4>
      <ul className='list-group' style={{ WebkitUserSelect: 'none' }}>
        {!log.isLoading ? (
          log.logs &&
          log.logs.map((log, i) => (
            <li
              key={log.id}
              className={`${
                log.content.includes('Added')
                  ? 'text-success'
                  : log.content.includes('Deleted') && 'text-danger'
              } list-group-item list-group-item-info log`}
            >
              <i
                className={`fa-${
                  log.content.includes('Added')
                    ? 'plus'
                    : log.content.includes('Deleted')
                    ? 'times'
                    : 'bell'
                } fas fa-lg`}
              ></i>
              <small>
                <span className='font-weight-bold'>{log.user} &bull; </span>
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
