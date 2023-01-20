import { Link } from 'react-router-dom';

const UserComment = (props) => {
  return (
    <div className='bg-white shadow-md p-2 w-full flex my-2' key={props.id}>
      <div className='flex items-center justify-between'>
        <div className='flex flex-row justify-center items-center'>
          <img
            src={props.profile}
            alt='avatar'
            className='w-8 h-8 rounded-full mr-2'
          />
        </div>
      </div>

      <div className='w-full border border-gray-800 rounded-lg flex'>
        <div className='w-full  pl-2'>
          <div>
            <Link
              to={`/profile/${props.username}`}
              className='hover:text-inherit'
            >
              <h4 className='font-bold text-base'>{props.name}</h4>
            </Link>

            <p className='text-gray-600 text-sm'>{props.time}</p>
          </div>

          {props.text && (
            <p className='text-gray-700 p-1 text-lg mb-4 break-words'>
              {props.text}
            </p>
          )}

          {props.gif && (
            <img src={props.gif} className='h-40 w-36 my-2' alt='gif' />
          )}
        </div>

        <div>
          <h1>{props.children}</h1>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
