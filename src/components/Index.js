import React, { useContext, useEffect } from 'react';

import { Context } from '../contexts/context';
import { getData } from '../actions/actions';

const Index = () => {
  const { state, dispatch } = useContext(Context);
  const { projects } = state;

  // Get items
  useEffect(() => {
    getData(dispatch);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <i className='fas fa-music' />
      <p>Index</p>
      {projects.map(({ id, author, content, title }) => (
        <div className='border' key={id}>
          <p>
            <strong>{title}</strong> created by {author}
          </p>
          <p>
            <strong>Content:</strong> {content}
          </p>
          <p>
            <strong>ID:</strong> {id}
          </p>
        </div>
      ))}
    </>
  );
};

export default Index;
