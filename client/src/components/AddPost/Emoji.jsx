const OptionEmojie = (props) => {
  return (
    <ul
      className='absolute flex mt-40  w-auto bg-white shadow rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 focus:outline-none'
      tabIndex='-1'
      role='listbox'
      aria-labelledby='listbox-label'
      aria-activedescendant='listbox-option-5'
    >
      <li
        className='bg-white cursor-default select-none relative py-2 px-3'
        id='listbox-option-0'
        role='option'
      >
        <div className='flex items-center'>
          <div className='bg-red-500 w-8 h-8 rounded-full flex items-center justify-center'>
            <svg
              className='text-white flex-shrink-0 h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>
      </li>

      {/* <!--
                 Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
                 Highlighted: 'bg-gray-100', Not Highlighted: 'bg-white'
               --> */}
      <li
        className='bg-white cursor-default select-none relative py-2 px-3'
        id='listbox-option-1'
        role='option'
      >
        <div className='flex items-center'>
          <div className='bg-pink-400 w-8 h-8 rounded-full flex items-center justify-center'>
            {/* <!-- Heroicon name: solid/heart --> */}
            <svg
              className='text-white flex-shrink-0 h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>
      </li>

      {/* <!--
                 Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
                 Highlighted: 'bg-gray-100', Not Highlighted: 'bg-white'
               --> */}
      <li
        className='bg-white cursor-default select-none relative py-2 px-3'
        id='listbox-option-2'
        role='option'
      >
        <div className='flex items-center'>
          <div className='bg-green-400 w-8 h-8 rounded-full flex items-center justify-center'>
            {/* <!-- Heroicon name: solid/emoji-happy --> */}
            <svg
              className='text-white flex-shrink-0 h-5 w-5'
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
          </div>
        </div>
      </li>
      {/* 
               <!--
                 Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
                 Highlighted: 'bg-gray-100', Not Highlighted: 'bg-white'
               --> */}
      <li
        className='bg-white cursor-default select-none relative py-2 px-3'
        id='listbox-option-3'
        role='option'
      >
        <div className='flex items-center'>
          <div className='bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center'>
            {/* <!-- Heroicon name: solid/emoji-sad --> */}
            <svg
              className='text-white flex-shrink-0 h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>
      </li>

      {/* <!--
                 Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
                 Highlighted: 'bg-gray-100', Not Highlighted: 'bg-white'
               --> */}
      <li
        className='bg-white cursor-default select-none relative py-2 px-3'
        id='listbox-option-4'
        role='option'
      >
        <div className='flex items-center'>
          <div className='bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center'>
            {/* <!-- Heroicon name: solid/thumb-up --> */}
            <svg
              className='text-white flex-shrink-0 h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path d='M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z' />
            </svg>
          </div>
        </div>
      </li>

      {/* <!--
                 Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
                 Highlighted: 'bg-gray-100', Not Highlighted: 'bg-white'
               --> */}
      <li
        className='bg-white cursor-default select-none relative py-2 px-3'
        id='listbox-option-5'
        role='option'
      >
        <div className='flex items-center'>
          <div className='bg-transparent w-8 h-8 rounded-full flex items-center justify-center'>
            {/* <!-- Heroicon name: solid/x --> */}
            <svg
              className='text-gray-400 flex-shrink-0 h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default OptionEmojie;
