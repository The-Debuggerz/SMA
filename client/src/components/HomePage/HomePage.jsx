import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [posts, setPost] = useState([]);
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log('isLoggedIn', isLoggedIn);

  let fetchPost = async () => {
    try {
      let res = await fetch('/api/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let data = await res.json();

      if (isLoggedIn) {
        setPost(data);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchPost();
    }
  }, [isLoggedIn]);

  console.log('posts-data', posts);
  console.log('isLoggedIn', isLoggedIn);

  return (
    <>
      <div className='grid place-items-center h-screen w-screen'>
        <h1 className='font-bold text-5xl'>
          Welcome To <b className='text-yellow-300'>The Debuggers</b>
        </h1>
        <div>
          <span className='text-xl'>Posts</span>
        </div>
        <div className='ui items'>
          {posts.map((post, i) => {
            return (
              <div className='item' key={post}>
                <a className='ui tiny image'>
                  <img src={'https://picsum.photos/200/300?random=' + i} />
                </a>
                <div className='content'>
                  <a className='header'>{post.title}</a>
                  <div className='description'>
                    <p>{post.content}</p>
                  </div>
                  <div className='meta'>
                    <span className='cinema'>
                      At {post.createdAt} by
                      <a className='font-bold'> {post.author}</a>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
