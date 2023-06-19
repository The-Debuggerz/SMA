import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const FollowersList = ({ user, onClose }) => {
  const [showModel, setShowModel] = useState(true);

  const handleClosePopup = () => {
    setShowModel(false);
    onClose();
  };

  return (
    <>
      {showModel && (
        <>
          <div className='w-11/12 lg:w-1/4 bg-gray-700 rounded-md p-3 mt-2 absolute top-0 flex justify-center flex-col sm:justify-center sm:right-0 z-40'>
            <div className='text-center' onClick={handleClosePopup}>
              <h1 className='text-2xl border rounded-full hover:text-white w-1/2 m-auto cursor-pointer'>
                X
              </h1>
            </div>
            {user.map(({ _id, name, username, picture }) => (
              <div
                className='flex items-center border border-gray-700 w-full rounded-md p-2 mb-2 bg-gray-100'
                key={_id}
              >
                <img
                  className='h-10 rounded-full mr-4'
                  src={picture ? picture : logo}
                  alt='user.name'
                  referrerPolicy='no-referrer'
                />
                <Link
                  to={`/profile/${username}`}
                  onClick={() => setShowModel(false)}
                >
                  {name}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default FollowersList;
