import React, { useContext } from 'react';
import moment from 'moment';

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
          log.logs.map(log => (
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
              <div className='log-info'>
                <small>
                  <span className='font-weight-bold'>
                    {log.user}&nbsp;&bull;&nbsp;
                  </span>
                  <span>{log.content}</span>
                </small>
                <span className='badge badge-info'>
                  {moment(log.time.toDate() - 1000).fromNow()}
                </span>
              </div>
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
