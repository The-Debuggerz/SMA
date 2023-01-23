import AddPost from '../AddPost/AddPost';

const InputBox = (props) => {
  return (
    <div className='absolute pb-2 z-50 flex flex-col items-center justify-center  rounded-lg bg-black w-full lg:w-1/2'>
      <div className='lg:h-60 w-6/12 m-4 border border-dashed border-gray-900 flex justify-center items-center overflow-hidden rounded-lg'>
        {props.previewUrl && (
          <img
            className='h-full w-full rounded-md'
            src={props.previewUrl}
            alt='Preview'
          />
        )}
      </div>
      <button className='absolute top-2 right-2' onClick={props.close}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 text-white'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      </button>

      {props.showAddPost === true && (
        <div className='h-40 w-full z-50 relative'>
          <AddPost
            profilePic={props.profilePic}
            method={'POST'}
            makePost={props.makePost}
            handleUpload={props.makePost}
            value={props.value}
            inputValue={props.inputValue}
            reff={props.reff}
            image={props.image}
          />
        </div>
      )}

      <div className='flex mt-4 justify-between w-60'>
        <div className='border border-red-300 rounded-md p-1'>
          <label className='cursor-pointer'>
            <input
              className='hidden'
              type='file'
              accept='image/*'
              onChange={props.handleImageChange}
              name='image'
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-8 h-8 text-gray-200'
            >
              <path
                fillRule='evenodd'
                d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
                clipRule='evenodd'
              />
            </svg>
          </label>
        </div>
        <hr />
        <hr />
        <hr />
        {props.showAddPost === false ? (
          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            onClick={props.handleUpload}
          >
            {props.loading ? props.spinner : 'Upload'}
          </button>
        ) : (
          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            onClick={props.makePost}
          >
            {props.loading ? props.spinner : 'Post'}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputBox;
