import React from 'react'

const OptionEmojie=(props)=>{
  <ul className='absolute z-10 mt-1 -ml-6 w-60 bg-white shadow rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm' tabindex='-1' role='listbox' aria-labelledby='listbox-label' aria-activedescendant='listbox-option-5'>
       
               <li className='bg-white cursor-default select-none relative py-2 px-3' id='listbox-option-0' role='option'>
                 <div className='flex items-center'>
                   <div className='bg-red-500 w-8 h-8 rounded-full flex items-center justify-center'>
                     <svg className='text-white flex-shrink-0 h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                       <path fillRule='evenodd' d='M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z' clipRule='evenodd' />
                     </svg>
                   </div>
                   <span className='ml-3 block font-medium truncate'> Excited </span>
                 </div>
               </li>

               {/* <!--
                 Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
                 Highlighted: 'bg-gray-100', Not Highlighted: 'bg-white'
               --> */}
               <li className='bg-white cursor-default select-none relative py-2 px-3' id='listbox-option-1' role='option'>
                 <div className='flex items-center'>
                   <div className='bg-pink-400 w-8 h-8 rounded-full flex items-center justify-center'>
                     {/* <!-- Heroicon name: solid/heart --> */}
                     <svg className='text-white flex-shrink-0 h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                       <path fillRule='evenodd' d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z' clipRule='evenodd' />
                     </svg>
                   </div>
                   <span className='ml-3 block font-medium truncate'> Loved </span>
                 </div>
               </li>

               {/* <!--
                 Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
                 Highlighted: 'bg-gray-100', Not Highlighted: 'bg-white'
               --> */}
               <li className='bg-white cursor-default select-none relative py-2 px-3' id='listbox-option-2' role='option'>
                 <div className='flex items-center'>
                   <div className='bg-green-400 w-8 h-8 rounded-full flex items-center justify-center'>
                     {/* <!-- Heroicon name: solid/emoji-happy --> */}
                     <svg className='text-white flex-shrink-0 h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                       <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z' clipRule='evenodd' />
                     </svg>
                   </div>
                   <span className='ml-3 block font-medium truncate'> Happy </span>
                 </div>
               </li>
{/* 
               <!--
                 Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
                 Highlighted: 'bg-gray-100', Not Highlighted: 'bg-white'
               --> */}
               <li className='bg-white cursor-default select-none relative py-2 px-3' id='listbox-option-3' role='option'>
                 <div className='flex items-center'>
                   <div className='bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center'>
                     {/* <!-- Heroicon name: solid/emoji-sad --> */}
                     <svg className='text-white flex-shrink-0 h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                       <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z' clipRule='evenodd' />
                     </svg>
                   </div>
                   <span className='ml-3 block font-medium truncate'> Sad </span>
                 </div>
               </li>

               {/* <!--
                 Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
                 Highlighted: 'bg-gray-100', Not Highlighted: 'bg-white'
               --> */}
               <li className='bg-white cursor-default select-none relative py-2 px-3' id='listbox-option-4' role='option'>
                 <div className='flex items-center'>
                   <div className='bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center'>
                     {/* <!-- Heroicon name: solid/thumb-up --> */}
                     <svg className='text-white flex-shrink-0 h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                       <path d='M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z' />
                     </svg>
                   </div>
                   <span className='ml-3 block font-medium truncate'> Thumbsy </span>
                 </div>
               </li>

               {/* <!--
                 Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
                 Highlighted: 'bg-gray-100', Not Highlighted: 'bg-white'
               --> */}
               <li className='bg-white cursor-default select-none relative py-2 px-3' id='listbox-option-5' role='option'>
                 <div className='flex items-center'>
                   <div className='bg-transparent w-8 h-8 rounded-full flex items-center justify-center'>
                     {/* <!-- Heroicon name: solid/x --> */}
                     <svg className='text-gray-400 flex-shrink-0 h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                       <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                     </svg>
                   </div>
                   <span className='ml-3 block font-medium truncate'> I feel nothing </span>
                 </div>
               </li>
             </ul>     
}
function AddPost() {
  return (
    <div className='flex items-start space-x-4'>
  <div className='flex-shrink-0'>
    <img className='inline-block h-10 w-10 rounded-full' src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='' />
  </div>
  <div className='min-w-0 flex-1 px-15 py-15'>
    <form action='#' className='relative'>
      <div className='border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 px-4 py-2'>
        <label htmlFor='comment' className='sr-only'>Add your comment</label>
        <textarea rows='4' name='comment' id='comment' className='block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm '   placeholder='Add your comment...'></textarea>
        <div className='py-2' aria-hidden='true'>
          <div className='py-px'>
            <div className='h-9'></div>
          </div>
        </div>
      </div>

      <div className='absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between'>
        <div className='flex items-center space-x-5'>
          <div className='flex items-center'>
            <button type='button' className='-m-2.5 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500'>
              <svg className='h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                <path fillRule='evenodd' d='M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z' clipRule='evenodd' />
              </svg>
              <span className='sr-only'>Attach a file</span>
            </button>
          </div>
          <div className='flex items-center'>
            <div>
              <label id='listbox-label' className='sr-only'> Your mood </label>
              <div className='relative'>
                <button type='button' className='relative -m-2.5 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500' aria-haspopup='listbox' aria-expanded='true' aria-labelledby='listbox-label'>
                  <span className='flex items-center justify-center'>
                    <span>
                      <svg className='flex-shrink-0 h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z' clipRule='evenodd' />
                      </svg>
                      <span className='sr-only'> Add your mood </span>
                    </span>
                    <span>
                      <div className='w-8 h-8 rounded-full flex items-center justify-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fire" viewBox="0 0 16 16">
  <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
</svg>
                      </div>
                      
                      <span className='sr-only'> Excited </span>
                    </span>
                  </span>
                </button>

             {/* //here it was  */}
              </div>
            </div>
          </div>
        </div>
        <div className='flex-shrink-0'>
          <button type='submit' className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Post</button>
        </div>
      </div>
    </form>
  </div>
</div>
  )
}

export default AddPost