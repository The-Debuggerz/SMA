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
          src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          alt=''
        />
      </div>

      <div className='min-w-0 flex-1 px-15 py-15'>
        <form
          className='relative'
          method={props.method}
          onSubmit={props.makePost}
        >
          <div className='border h-40 border-gray-300 rounded-lg shadow-sm overflow-hidden px-4 py-2'>
            <textarea
              rows='4'
              name='comment'
              id='comment'
              className='block w-full py-3 text-lg outline-none resize-none focus:ring-0'
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
                  <div className='relative ml-5'>
                    <button
                      type='button'
                      className='w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500'
                      aria-haspopup='listbox'
                      aria-expanded='true'
                      aria-labelledby='listbox-label'
                      onClick={handleClick}
                    >
                      <span className='flex items-center justify-center'>
                        <span>
                          <svg
                            className='flex-shrink-0 h-5 w-5'
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
            <div className='flex-shrink-0'>
              <button
                type='submit'
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Post
              </button>
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
