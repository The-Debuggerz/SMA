import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  useEditPostQuery,
  usePostEditPostMutation,
} from '../../Store/UsersPostApi';
import AddPost from '../AddPost/AddPost';
import Loader from '../Loader/Loader';

const EditPost = () => {
  const [inputText, setInputText] = useState('');
  const { postID } = useParams();
  const navigate = useNavigate();

  let { picture } = useSelector((state) => state.auth);

  const { data, isLoading, error } = useEditPostQuery(postID);
  const [updatePost] = usePostEditPostMutation();

  useEffect(() => {
    if (data) {
      setInputText(data.text);
    }
  }, [data]);

  let updatEditPost = async (e) => {
    e.preventDefault();
    return (await updatePost({ postID, inputText })) && navigate('/');
  };

  if (isLoading) return <Loader />;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className='p-40'>
      <div className='m-16'>
        <AddPost
          method={'PUT'}
          value={inputText}
          inputValue={(e) => setInputText(e.target.value)}
          makePost={updatEditPost}
          profilePic={picture}
        />
      </div>
    </div>
  );
};

export default EditPost;
