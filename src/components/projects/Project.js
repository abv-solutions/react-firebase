import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProjectList = props => {
  const { id, author, content, title } = props.project;
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
        <p className='card-text'>
          <strong>
            <i className='fas fa-edit text-info mr-1'></i>
            Excerpt:&nbsp;
          </strong>
          {excerpt}
          <br />
          <strong>
            <i className='fas fa-user text-info mr-2' />
            Posted by&nbsp;
          </strong>
          {author}
          <br />
          <i className='fas fa-calendar-alt text-info mr-2'></i>
          3rd September, 4pm
        </p>
      </div>
    </Link>
  );
};

export default ProjectList;
