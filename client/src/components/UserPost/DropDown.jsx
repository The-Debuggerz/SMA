import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserPost.css';

const DropDown = (props) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const handleClick = () => {
    setShowDropDown((current) => !current);
  };

  return (
    <div className='dropdownmenu' onClick={handleClick}>
      <svg
        className='dropbutton p-4'
        viewBox='0 0 22 6'
        preserveAspectRatio='xMinYMin meet'
      >
        <path d='M19,6c-1.657,0-3-1.344-3-3c0-1.656,1.343-3,3-3s3,1.344,3,3C22,4.656,20.657,6,19,6z M19,2c-0.553,0-1,0.447-1,1c0,0.552,0.447,1,1,1c0.552,0,1-0.449,1-1C20,2.447,19.552,2,19,2z M11,6C9.343,6,8,4.656,8,3c0-1.656,1.343-3,3-3s3,1.344,3,3C14,4.656,12.657,6,11,6z M11,2c-0.553,0-1,0.447-1,1c0,0.552,0.447,1,1,1c0.552,0,1-0.449,1-1C12,2.447,11.552,2,11,2z M3,6C1.343,6,0,4.656,0,3c0-1.656,1.343-3,3-3c1.656,0,3,1.344,3,3C6,4.656,4.656,6,3,6z M3,2C2.447,2,2,2.447,2,3c0,0.552,0.447,1,1,1c0.552,0,1-0.449,1-1C4,2.447,3.552,2,3,2z'></path>
      </svg>

      {showDropDown && (
        <div id='Dropdown' className='dropdownmenu-content p-3'>
          <Link className='dMenu' to={`/edit-post/${props.postId}`}>
            Edit Post
          </Link>
          <button className='dMenu' onClick={props.delete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDown;
