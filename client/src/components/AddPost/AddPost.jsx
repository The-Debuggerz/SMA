import React, { useRef, useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

function AddPost(props) {
  const emojiRef = useRef(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleClick = () => {
    // 👇️ toggle shown state
    setShowPicker((current) => !current);
  };

  return (
    <div className='flex items-start space-x-4'>
      <div className='flex-shrink-0'>
        <img
          className='inline-block h-10 w-10 rounded-full'
          src={props.profilePic}
          alt=''
        />
      </div>

      <div className='min-w-0 flex-1 px-15 py-15'>
        <form
          className='relative'
          method='post'
          onSubmit={props.makePost}
          encType='multipart/form-data'
        >
          <div className='border text-center flex justify-center items-center cursor-pointer h-40 w-full border-gray-300 rounded-xl shadow-sm overflow-hidden px-4 py-2'>
            <textarea
              rows='4'
              name='text'
              className='block w-full py-1 text-lg rounded-md p-4 outline-none resize-none focus:ring-0'
              placeholder='What are you up to?'
              ref={emojiRef}
              value={props.value}
              onChange={props.inputValue}
            ></textarea>

            <div className='py-2' aria-hidden='true'>
              <div className='py-px'>
                <div className='h-9'></div>
              </div>
            </div>
          </div>

          <div className='absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between'>
            <div className='flex items-center space-x-5'>
              <div className='flex items-center'>
                <div>
                  <div className='flex justify-center items-center'>
                    <button
                      type='button'
                      className='h-10 mb-2 ml-4 rounded-full  text-gray-400 hover:text-gray-500'
                      aria-haspopup='listbox'
                      aria-expanded='true'
                      aria-labelledby='listbox-label'
                      onClick={handleClick}
                    >
                      <span className='flex items-center justify-center'>
                        <span>
                          <svg
                            className='flex-shrink-0 h-6 w-6 text-gray-800'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              fillRule='evenodd'
                              d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                          <span className='sr-only'> Add your mood </span>
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div>
        {showPicker && (
          <Picker
            data={data}
            onEmojiSelect={(e) => {
              console.log('e', typeof e.native);
              emojiRef.current.value += e.native;
              emojiRef.current.focus();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default AddPost;
