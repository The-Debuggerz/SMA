const Gif = (props) => {
  return (
    <>
      <button
        key={props.id}
        className='bg-blue-500 text-white p-2 rounded'
        onClick={props.handleGIFButtonClick}
      >
        GIF
      </button>

      <div
        className={`${
          !props.showGrid ? 'hidden' : ''
        } bg-gray-700 w-3/5 p-2 rounded-lg absolute -ml-32 mt-1 overflow-scroll h-72`}
      >
        <div className='flex rounded-md shadow-sm'>
          <input
            type='text'
            className='pl-2 w-full mb-2 flex justify-center items-center mr-2 border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5'
            placeholder='Search GIF'
            value={props.searchInputTerm}
            onChange={props.handleChange}
          />

          <div
            className='bg-gray-400 rounded-lg z-40 mb-2'
            onClick={props.handleGoBack}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={3.5}
              stroke='currentColor'
              className='w-8 h-8 p-1 cursor-pointer'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
              />
            </svg>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-2'>
          {props.categories?.length > 0 &&
            props.categories.map((item, i) => {
              return (
                <div
                  key={i}
                  className='rounded-2xl relative flex text-center justify-center items-center cursor-pointer border-2 border-transparent hover:border-2 hover:border-blue-500 overflow-x-hidden'
                  onClick={!props.isSearchResult ? props.commentGif : null}
                >
                  <img
                    key={item.id ? item.id : item.searchTerm}
                    src={item.image ? item.image : item.media_formats.gif.url}
                    alt={
                      item.searchterm
                        ? item.searchterm
                        : item.content_description
                    }
                    onClick={props.getGifSrc}
                    className='object-scale-down h-28 w-20 bg-gray-900 rounded-xl opacity-80 fix'
                  />
                  <p
                    aria-label={
                      item.searchterm
                        ? item.searchterm
                        : item.content_description
                    }
                    className='absolute text-white z-50 w-full p-1 rounded-lg text-lg font-bold'
                  >
                    {item.searchterm}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Gif;
