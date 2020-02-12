import React from 'react';

const Notifications = () => {
  return (
    <div className='col-md-6'>
      <h4 className='mb-4 text-center'>Notifications</h4>
      <ul className='list-group' style={{ WebkitUserSelect: 'none' }}>
        <li className='list-group-item list-group-item-info'>
          Dummy notification
        </li>
        <li className='list-group-item list-group-item-info'>
          Dummy notification
        </li>
      </ul>
    </div>
  );
};

export default Notifications;
