import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DropDown from '../UserPost/DropDown';
import UserComment from '../UserPost/Comments';
import UserPost from '../UserPost/UserPost';
import logo from '../../assets/logo.png';

import Gif from '../GIF/Gif';

import { useLazySelectedGifQuery } from '../../Store/GIFApi';

import {
  useDeletePostMutation,
  useLikeMutation,
  useUnlikeMutation,
  usePostCommentMutation,
  useDeleteCommentMutation,
} from '../../Store/ProfileApi';

import { useSinglePostQuery } from '../../Store/SinglePostApi';
import useDebounce from '../../util/Debounce';

const SinglePost = () => {
  const [isLoadingD, setIsLoadingD] = useState(false);
  const [commentText, setCommentText] = useState('');
  // GIF STATE
  const [showGrid, setShowGrid] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchInputTerm, setSearchInputTerm] = useState('');
  const [isShowingOriginal, setIsShowingOriginal] = useState(true);
  const [originalCategories, setOriginalCategories] = useState([]);
  const [isSearchResult, setIsSearchResult] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  let { postID } = useParams();
  let navigate = useNavigate();

  const { id } = useSelector((state) => state.auth);

  const { data, isLoading, error, isFetching, refetch } =
    useSinglePostQuery(postID);

  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [like] = useLikeMutation();
  const [unlike] = useUnlikeMutation();
  const [createComment, commentStatus] = usePostCommentMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();

  // -------------------------------------------------------

  const [selectedGif] = useLazySelectedGifQuery();
  const debouncedQuery = useDebounce(searchInputTerm, 1000);

  // -------------------------------------------------------

  useEffect(() => {
    let gData = async () => {
      let mData = await fetch(
        `https://tenor.googleapis.com/v2/categories?key=${
          import.meta.env.VITE_GIF_API_KEY
        }&client_key=${import.meta.env.VITE_GIF_API_CLIENT_KEY}`
      );

      let res = await mData.json();
      setCategories(res?.tags);
      setOriginalCategories(res?.tags);
    };

    gData();
  }, []);

  // -------------------------------------------------------

  useEffect(() => {
    let search = async () => {
      let sData = await fetch(
        `https://tenor.googleapis.com/v2/search?q=${searchInputTerm}&key=${
          import.meta.env.VITE_GIF_API_KEY
        }&client_key=${import.meta.env.VITE_GIF_API_CLIENT_KEY}&limit=${12}`
      );

      let res = await sData.json();
      console.log('🚀 search ~ res', res);

      setIsSearchResult(true);
      setCategories(res?.results);
    };

    if (debouncedQuery) {
      search();
    }
  }, [debouncedQuery]);

  // -------------------------------------------------------

  useEffect(() => {
    if (commentStatus.status === 'fulfilled') {
      toast('Commented!');
    }
  }, [commentStatus.status]);

  useEffect(() => {
    if (deleteCommentStatus.status === 'fulfilled') {
      toast('Comment Deleted!');
    }

    if (deletePostStatus.status === 'fulfilled') {
      toast('Post Deleted!');
      navigate('/');
    }
  }, [deleteCommentStatus.status, deletePostStatus.status]);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;

  if (data === 'No Post Found') {
    return (
      <div className='text-white text-5xl w-full h-full p-60 flex justify-center'>
        <h1>No Post Found</h1>
      </div>
    );
  }

  // ************************************************************************************************
  // 🚀 Helper Functions 🚀
  // ************************************************************************************************

  let handleComment = async (e, postId) => {
    e.preventDefault();

    await createComment({ commentText, postId });
    setCommentText('');

    refetch();
  };

  let deleteCommentHandler = async (e, postId) => {
    e.preventDefault();

    await deleteComment(postId);
    setCommentText('');
    refetch();
  };

  // ------------------------------------------------------------

  const handleGIFButtonClick = async () => {
    setShowGrid((showGrid) => !showGrid);
  };

  const commentGif = async (e) => {
    const newTerm = e.target.alt || e.target.getAttribute('aria-label');

    selectedGif(newTerm).then(({ data }) => {
      setSearchInputTerm(newTerm);
      setIsSearchResult(true);
      setCategories(data.results);
    });
  };

  const handleGoBack = () => {
    setIsSearchResult(false);
    setIsShowingOriginal(false);

    if (isShowingOriginal) {
      setSearchInputTerm('');
      setCategories(originalCategories);
    } else {
      setIsShowingOriginal(true);
      setCategories(originalCategories);
    }
  };

  const handleChange = async (e) => {
    const newTerm = e.target.value;

    if (e.target.value === '') {
      setIsSearchResult(false);
      setIsShowingOriginal(false);
      setCategories(originalCategories);

      setSearchInputTerm('');
      return;
    }

    setSearchInputTerm(newTerm);
  };

  // get link of gif on click and comment it
  const getGifSrc = async (e, postId) => {
    console.log('🚀 getGifSrc running');

    if (!isSearchResult) return;
    console.log('🚀 isSearchResult', isSearchResult);

    let gifLink = e.target.src;
    console.log('🚀 gifLink', gifLink);

    isSearchResult && (await createComment({ gifLink, postId }));
    // setIsShowingOriginal(true);

    setCategories(originalCategories);
    setSearchInputTerm('');
    setIsSearchResult(false);

    setShowGrid(!showGrid);
    setIsInitialized(!isInitialized);
    refetch();
  };

  // ------------------------------------------------------------

  return (
    <>
      <div className='flex justify-center w-full relative pt-10 pb-40'>
        <UserPost
          key={data.post._id}
          id={data.post._id}
          profile={data.post.user.picture ? data.post.user.picture : logo}
          name={data.post.user.name}
          username={data.post.user.username}
          text={data.post.text}
          userPostImage={data.post.image}
          time={data.time}
          mujib={data.likeStatus}
          likes={data.likeCount}
          like={() => {
            refetch();
            if (!isFetching && data.likeStatus) {
              return unlike(data.post._id);
            } else {
              return like(data.post._id);
            }
          }}
          commentValue={commentText}
          inputValue={(e) => setCommentText(e.target.value)}
          disabled={isLoadingD}
          comment={(e) => handleComment(e, data.post._id)}
        >
          {id === data.post.user._id ? (
            <DropDown
              showEditButton={true}
              delete={() => deletePost(data.post._id)}
              postId={data.post._id}
            />
          ) : null}

          <div className='gif-box ml-2 z-50'>
            <Gif
              // key={props.id}
              // postId={props.id}
              showGrid={showGrid}
              handleGIFButtonClick={handleGIFButtonClick}
              searchInputTerm={searchInputTerm}
              handleChange={handleChange}
              handleGoBack={handleGoBack}
              categories={categories}
              isSearchResult={isSearchResult}
              commentGif={commentGif}
              getGifSrc={(e) => getGifSrc(e, data.post._id)}
            />
          </div>

          {data.post.comments.length > 0
            ? data.post.comments.map((comment, i) => {
                return (
                  <UserComment
                    key={comment._id}
                    profile={comment.picture ? comment.picture : logo}
                    time={data.commentTime[i].time}
                    name={comment.name}
                    username={comment.username}
                    text={comment.text ? comment.text : null}
                    gif={comment.gifUrl ? comment.gifUrl : null}
                  >
                    <DropDown
                      delete={(e) => deleteCommentHandler(e, comment._id)}
                      postId={comment._id}
                    />
                  </UserComment>
                );
              })
            : null}

          {data.post.comments.length > 0 && (
            <div className='text-blue-600 flex justify-center underline'>
              {null}
            </div>
          )}
        </UserPost>
      </div>

      <ToastContainer />
    </>
  );
};

export default SinglePost;
