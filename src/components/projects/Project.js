import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Project = props => {
  const { id, author, content, title, createdAt } = props.project;
  const [excerpt, setState] = useState('');

  useEffect(() => {
    let trimmed = content.substr(0, 40);
    if (content.length > 40) {
      trimmed = trimmed.substr(
        0,
        Math.min(trimmed.length, trimmed.lastIndexOf(' '))
      );
      setState(trimmed);
    } else {
      setState(content);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Link className='card mb-4 shadow project' to={`/project/${id}`}>
      <div className='card-body'>
        <h5 className='text-info'>{title}</h5>
        <div className='card-text'>
          <div className='project-info mb-2'>
            <strong>
              <i className='fas fa-edit fa-lg text-info'></i>
            </strong>
            <span>
              <strong>Excerpt:&nbsp;</strong>
              {excerpt}
            </span>
          </div>
          <div className='project-info mb-2'>
            <strong>
              <i className='fas fa-user fa-lg text-info' />
            </strong>
            <span>
              <strong>Posted by&nbsp;</strong>
              {author}
            </span>
          </div>
          <div className='project-info mb-2'>
            <i className='fas fa-calendar-alt fa-lg text-info'></i>
            <span>
              {createdAt.toDate().toLocaleString('en-gb', {
                hour12: false,
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Project;
