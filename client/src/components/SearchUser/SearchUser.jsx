import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDebounce from '../../util/Debounce';
import logo from '../../assets/logo.png';

const SearchUser = () => {
  const [query, setQuery] = useState(''); // state to hold the search query
  const [results, setResults] = useState(null); // state to hold the search results
  const debouncedQuery = useDebounce(query, 1000); // debounce the search query for 500ms

  useEffect(() => {
    async function search() {
      const data = await fetch(`/api/search?q=${debouncedQuery}`);
      let res = await data.json();
      setResults(res);
    }

    if (debouncedQuery) {
      search();
    }
  }, [debouncedQuery]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='mt-4 lg:w-1/4 w-10/12'>
        <div className='relative rounded-md shadow-sm'>
          <input
            id='search'
            type='search'
            placeholder='Search User - Ex. Mujib'
            value={query}
            onChange={handleChange}
            className='text-center text-lg px-4 border w-full outline-none border-gray-400 py-2 leading-5 rounded-md transition duration-150 ease-in-out'
          />
        </div>
      </div>
      {query && results?.found && results.users.length > 0 ? (
        <div className='w-1/4 rounded-md p-3 bg-gray-700 mt-2'>
          {results.users.map((user) => (
            <div
              className='flex items-center border border-gray-700 w-full rounded-md p-2 mb-2 bg-gray-100'
              key={user._id}
            >
              <img
                className='h-10 rounded-full mr-4'
                src={user.picture ? user.picture : logo}
                alt='user.name'
                referrerPolicy='no-referrer'
              />
              <Link to={`/profile/${user.username}`}>{user.name}</Link>
            </div>
          ))}
        </div>
      ) : (
        query &&
        results?.found === false && (
          <div className='user-list mt-4 lg:w-1/4 rounded-md'>
            <p className='text-center text-white'>No users found</p>
          </div>
        )
      )}
    </div>
  );
};

export default SearchUser;
