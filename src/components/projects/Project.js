import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = props => {
  const { id, author, content, title } = props.project;

  return (
    <Link className='card mb-4 shadow project' to={`/project/${id}`}>
      <div className='card-body'>
        <h5>{title}</h5>
        <p className='card-text'>
          <strong>
            <i className='fas fa-edit'></i>
            &nbsp;Excerpt:
          </strong>
          &nbsp;{content}
          <br />
          <strong>
            <i className='fas fa-user-edit' />
            &nbsp;Posted by
          </strong>
          &nbsp;{author}
          <br />
          <i className='fas fa-calendar-alt'></i>
          &nbsp;&nbsp;3rd September, 4pm
        </p>
      </div>
    </Link>
  );
};

export default ProjectList;
