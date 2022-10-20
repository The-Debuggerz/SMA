import React from 'react';
const ChatPage = () => {

  const avatarImg = 'https://card.thomasdaubenton.com/img/photo.jpg'
  return (
    <div className='w-full h-[calc(100vh-56px)]'>
      <div className='flex h-full'>
        <div className='flex-1 bg-gray-100 w-full'>
          <div className='main-body container m-auto w-11/12 h-full flex flex-col'>
            <div className='py-4 flex-2 flex flex-row'>
              <div className='flex-1 text-right'></div>
            </div>

            <div className='main flex-1 flex flex-col'>
              <div className='hidden lg:block heading flex-2'>
                <h1 className='text-3xl text-gray-700 mb-4'>Chat</h1>
              </div>

              <div className='flex-1 flex h-full'>
                <div className='sidebar hidden lg:flex w-1/3 flex-2 flex-col pr-6'>
                  <div className='search flex-2 pb-6 px-2'>
                    <input
                      type='text'
                      className='outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200'
                      placeholder='Search'
                    />
                  </div>
                  <div className='flex-1 h-full overflow-auto px-2'>
                    <div className='entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md'>
                      <div className='flex-2'>
                        <div className='w-12 h-12 relative'>
                          <img
                            className='w-12 h-12 rounded-full mx-auto'
                            src={avatarImg}
                            alt='chat-user'
                          />
                          <span className='absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white'></span>
                        </div>
                      </div>
                      <div className='flex-1 px-2'>
                        <div className='truncate w-32'>
                          <span className='text-gray-800'>Ryann Remo</span>
                        </div>
                        <div>
                          <small className='text-gray-600'>Yea, Sure!</small>
                        </div>
                      </div>
                      <div className='flex-2 text-right'>
                        <div>
                          <small className='text-gray-500'>15 April</small>
                        </div>
                        <div>
                          <small className='text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block'>
                            23
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className='entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md'>
                      <div className='flex-2'>
                        <div className='w-12 h-12 relative'>
                          <img
                            className='w-12 h-12 rounded-full mx-auto'
                            src={avatarImg}
                            alt='chat-user'
                          />
                          <span className='absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white'></span>
                        </div>
                      </div>
                      <div className='flex-1 px-2'>
                        <div className='truncate w-32'>
                          <span className='text-gray-800'>Karp Bonolo</span>
                        </div>
                        <div>
                          <small className='text-gray-600'>Yea, Sure!</small>
                        </div>
                      </div>
                      <div className='flex-2 text-right'>
                        <div>
                          <small className='text-gray-500'>15 April</small>
                        </div>
                        <div>
                          <small className='text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block'>
                            10
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className='entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md border-l-4 border-red-500'>
                      <div className='flex-2'>
                        <div className='w-12 h-12 relative'>
                          <img
                            className='w-12 h-12 rounded-full mx-auto'
                            src={avatarImg}
                            alt='chat-user'
                          />
                          <span className='absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white'></span>
                        </div>
                      </div>
                      <div className='flex-1 px-2'>
                        <div className='truncate w-32'>
                          <span className='text-gray-800'>
                            Mercedes Yemelyan
                          </span>
                        </div>
                        <div>
                          <small className='text-gray-600'>Yea, Sure!</small>
                        </div>
                      </div>
                      <div className='flex-2 text-right'>
                        <div>
                          <small className='text-gray-500'>15 April</small>
                        </div>
                      </div>
                    </div>
                    <div className='entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md'>
                      <div className='flex-2'>
                        <div className='w-12 h-12 relative'>
                          <img
                            className='w-12 h-12 rounded-full mx-auto'
                            src={avatarImg}
                            alt='chat-user'
                          />
                          <span className='absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white'></span>
                        </div>
                      </div>
                      <div className='flex-1 px-2'>
                        <div className='truncate w-32'>
                          <span className='text-gray-800'>Cadi Kajetán</span>
                        </div>
                        <div>
                          <small className='text-gray-600'>Yea, Sure!</small>
                        </div>
                      </div>
                      <div className='flex-2 text-right'>
                        <div>
                          <small className='text-gray-500'>15 April</small>
                        </div>
                      </div>
                    </div>
                    <div className='entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md'>
                      <div className='flex-2'>
                        <div className='w-12 h-12 relative'>
                          <img
                            className='w-12 h-12 rounded-full mx-auto'
                            src={avatarImg}
                            alt='chat-user'
                          />
                          <span className='absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white'></span>
                        </div>
                      </div>
                      <div className='flex-1 px-2'>
                        <div className='truncate w-32'>
                          <span className='text-gray-800'>Rina Samuel</span>
                        </div>
                        <div>
                          <small className='text-gray-600'>Yea, Sure!</small>
                        </div>
                      </div>
                      <div className='flex-2 text-right'>
                        <div>
                          <small className='text-gray-500'>15 April</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='chat-area flex-1 flex flex-col'>
                  <div className='flex-3 mb-8'>
                    <h2 className='text-xl py-1 mb-8 border-b-2 border-gray-200'>
                      Chatting with <b>Mercedes Yemelyan</b>
                    </h2>
                  </div>
                  <div className='messages flex-1 overflow-auto'>
                    <div className='message mb-4 flex'>
                      <div className='flex-2'>
                        <div className='w-12 h-12 relative'>
                          <img
                            className='w-12 h-12 rounded-full mx-auto'
                            src={avatarImg}
                            alt='chat-user'
                          />
                          <span className='absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white'></span>
                        </div>
                      </div>
                      <div className='flex-1 px-2'>
                        <div className='inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700'>
                          <span>
                            Hey there. We would like to invite you over to our
                            office for a visit. How about it?
                          </span>
                        </div>
                        <div className='pl-4'>
                          <small className='text-gray-500'>15 April</small>
                        </div>
                      </div>
                    </div>
                    <div className='message mb-4 flex'>
                      <div className='flex-2'>
                        <div className='w-12 h-12 relative'>
                          <img
                            className='w-12 h-12 rounded-full mx-auto'
                            src={avatarImg}
                            alt='chat-user'
                          />
                          <span className='absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white'></span>
                        </div>
                      </div>
                      <div className='flex-1 px-2'>
                        <div className='inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700'>
                          <span>
                            All travel expenses are covered by us of course :D
                          </span>
                        </div>
                        <div className='pl-4'>
                          <small className='text-gray-500'>15 April</small>
                        </div>
                      </div>
                    </div>
                    <div className='message me mb-4 flex text-right'>
                      <div className='flex-1 px-2'>
                        <div className='inline-block bg-blue-600 rounded-full p-2 px-6 text-white'>
                          <span>It's like a dream come true</span>
                        </div>
                        <div className='pr-4'>
                          <small className='text-gray-500'>15 April</small>
                        </div>
                      </div>
                    </div>
                    <div className='message me mb-4 flex text-right'>
                      <div className='flex-1 px-2'>
                        <div className='inline-block bg-blue-600 rounded-full p-2 px-6 text-white'>
                          <span>I accept. Thank you very much.</span>
                        </div>
                        <div className='pr-4'>
                          <small className='text-gray-500'>15 April</small>
                        </div>
                      </div>
                    </div>
                    <div className='message mb-4 flex'>
                      <div className='flex-2'>
                        <div className='w-12 h-12 relative'>
                          <img
                            className='w-12 h-12 rounded-full mx-auto'
                            src={avatarImg}
                            alt='chat-user'
                          />
                          <span className='absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white'></span>
                        </div>
                      </div>
                      <div className='flex-1 px-2'>
                        <div className='inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700'>
                          <span>You are welome. We will stay in touch.</span>
                        </div>
                        <div className='pl-4'>
                          <small className='text-gray-500'>15 April</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex-2 pt-4 pb-10'>
                    <div className='write bg-white shadow flex rounded-lg'>
                      <div className='flex-3 flex content-center items-center text-center p-4 pr-0'>
                        <span className='block text-center text-gray-400 hover:text-gray-800'>
                          <svg
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            className='h-6 w-6'
                          >
                            <path d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                          </svg>
                        </span>
                      </div>
                      <div className='flex-1'>
                        <textarea
                          name='message'
                          className='w-full block outline-none py-4 px-4 bg-transparent'
                          rows='1'
                          placeholder='Type a message...'
                          autoFocus
                        ></textarea>
                      </div>
                      <div className='flex-2 w-32 p-2 flex content-center items-center'>
                        <div className='flex-1 text-center'>
                          <span className='text-gray-400 hover:text-gray-800'>
                            <span className='inline-block align-text-bottom'>
                              <svg
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                className='w-6 h-6'
                              >
                                <path d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'></path>
                              </svg>
                            </span>
                          </span>
                        </div>
                        <div className='flex-1'>
                          <button className='bg-blue-400 w-10 h-10 rounded-full inline-block'>
                            <span className='inline-block align-text-bottom'>
                              <svg
                                fill='none'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                viewBox='0 0 24 24'
                                className='w-4 h-4 text-white'
                              >
                                <path d='M5 13l4 4L19 7'></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
