import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { RotatingLines } from 'react-loader-spinner';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Gif from '../GIF/Gif';

import { useLazySelectedGifQuery } from '../../Store/GIFApi';

import {
  useGetProfileQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useDeletePostMutation,
  useLikeMutation,
  useUnlikeMutation,
  usePostCommentMutation,
  useCreatePostMutation,
  useUpdateProfilePicMutation,
  useDeleteCommentMutation,
} from '../../Store/ProfileApi';

import DropDown from '../UserPost/DropDown';
import InputBox from '../InputBox/InputBox';
import Loader from '../Loader/Loader';
import logo from '../../assets/logo.png';
import UserPost from '../UserPost/UserPost';
import {
  useProfileImageUpload,
  usePostUpload,
} from '../InputBox/ContentUploader';

import UserComment from '../UserPost/Comments';
import useDebounce from '../../util/Debounce';
import FollowersList from '../FollowersList/FollowersList';

const UserProfile = () => {
  const [showFollowersList, SetShowFollowersList] = useState(false);
  const [showFollowingList, SetShowFollowingList] = useState(false);

  const [isLoadingD, setIsLoadingD] = useState(false);
  const [commentText, setCommentText] = useState('');
  // GIF STATE
  const [showGrid, setShowGrid] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchInputTerm, setSearchInputTerm] = useState('');
  const [isShowingOriginal, setIsShowingOriginal] = useState(true);
  const [originalCategories, setOriginalCategories] = useState([]);
  const [isSearchResult, setIsSearchResult] = useState(false);

  let { userbyname } = useParams();

  const { username: currentUser, id } = useSelector((state) => state.auth);
  const debouncedQuery = useDebounce(searchInputTerm, 1000);
  // <-------- -------- * ---------------- >

  const {
    data,
    error,
    isLoading: isLoadingQuery,
    isFetching,
    refetch,
  } = useGetProfileQuery(userbyname);

  // <-------- -------- * ---------------- >
  const [updateProfilePic] = useUpdateProfilePicMutation();
  const {
    handleImageChange,
    handleUpload,
    previewUrl,
    profileBox,
    profileImageBox,
  } = useProfileImageUpload(updateProfilePic);

  // <-------- -------- * ---------------- >
  const [createPost, createPostStatus] = useCreatePostMutation();

  const {
    handlePostImageChange,
    makePost,
    postImagePreview,
    inputText,
    setInputText,
    createPostBox,
    inputBox,
  } = usePostUpload(createPost);
  // <-------- -------- * ---------------- >

  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [like] = useLikeMutation();
  const [unlike] = useUnlikeMutation();
  const [createComment, commentStatus] = usePostCommentMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();

  const [followUser, { isLoading: followIsLoading }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: unFollowIsLoading }] =
    useUnfollowUserMutation();

  // <-------- -------- * ---------------- >

  useEffect(() => {
    if (deleteCommentStatus.status === 'fulfilled') {
      toast('Comment Deleted!');
    }
    if (
      deletePostStatus.status === 'fulfilled' &&
      deletePostStatus.endpointName === 'deletePost'
    ) {
      toast('Post Deleted!');
    }
  }, [deleteCommentStatus.status, deletePostStatus.status]);

  useEffect(() => {
    if (commentStatus.status === 'fulfilled') {
      toast('Commented!');
    }
    if (
      createPostStatus.status === 'fulfilled' &&
      createPostStatus.endpointName === 'createPost'
    ) {
      toast('Post Created!');
    }
  }, [commentStatus.status, createPostStatus.status]);

  // -------------------------------------------------------

  useEffect(() => {
    let gData = async () => {
      let mData = await fetch(
        `https://tenor.googleapis.com/v2/categories?key=AIzaSyA_txpXQGN4Y9jWf0tqjbrRfy-ng4zrp4c&client_key=thedebuggerssma`
      );

      let res = await mData.json();
      setCategories(res?.tags);
      setOriginalCategories(res?.tags);
    };

    gData();
  }, []);

  const [selectedGif] = useLazySelectedGifQuery();

  // -------------------------------------------------------
  // search gif via input box
  useEffect(() => {
    let search = async () => {
      let sData = await fetch(
        `https://tenor.googleapis.com/v2/search?q=${searchInputTerm}&key=AIzaSyA_txpXQGN4Y9jWf0tqjbrRfy-ng4zrp4c&client_key=thedebuggerssma&limit=${12}`
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

  // <-------- -------- * ---------------- >

  if (isLoadingQuery) return <Loader />;
  if (error) {
    return (
      <div className='text-center h-screen grid place-items-center'>
        <h1 className='text-4xl'>{error.data.message}</h1>
      </div>
    );
  }

  // ************************************************************************************************
  // 🚀 Helper Functions 🚀
  // ************************************************************************************************

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
    refetch();
  };

  // Follow / Unfollow User
  let toggleBtn = async () => {
    if (data.followStatus) {
      await unfollowUser(userbyname);
    } else {
      await followUser(userbyname);
    }
  };

  let handleComment = async (e, postId) => {
    e.preventDefault();

    await createComment({ commentText, postId });
    setCommentText('');
  };

  const handleFollowingListClose = () => {
    SetShowFollowingList(false);
  };

  const handleFollowersListClose = () => {
    SetShowFollowersList(false);
  };

  return (
    <>
      {!isLoadingQuery && !error && (
        <div className='grid place-items-center relative overflow-hidden pb-20'>
          <div className='h-4/4 w-11/12 bg-red-600 rounded-2xl py-12 my-2 lg:my-12'>
            <div className='ml-2 flex items-center justify-evenly'>
              <div className='mr-1 ml-2'>
                <div className='img lg:w-auto w-20'>
                  <img
                    className='rounded-full lg:w-48 lg:h-48 w-11/12 ml-2'
                    src={data.user.picture ? data.user.picture : logo}
                    alt='logo'
                    referrerPolicy='no-referrer'
                  />
                </div>

                {currentUser === data?.user?.username && (
                  <div
                    className='relative lg:-top-10 -top-5 left-5 cursor-pointer'
                    onClick={profileImageBox}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-8 h-8 text-gray-200'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                )}
              </div>

              {currentUser === data?.user?.username && profileBox && (
                <InputBox
                  showAddPost={false}
                  close={profileImageBox}
                  handleImageChange={handleImageChange}
                  handleUpload={handleUpload}
                  previewUrl={previewUrl}
                  spinner={
                    <RotatingLines
                      strokeColor='grey'
                      strokeWidth='5'
                      animationDuration='1'
                      width='20'
                      visible={true}
                    />
                  }
                  loading={createPostStatus.isLoading}
                />
              )}

              <div className='flex-col'>
                <div className='flex items-center'>
                  <div className='text-white '>
                    <h1 className='lg:text-4xl text-2xl'>
                      {data.user.name || 'The Debuggers'}
                    </h1>

                    <h3 className='text-xl cursor-pointer'>
                      {'@' + data.user.username}
                    </h3>
                  </div>

                  {data.user.username !== currentUser && (
                    <div className='flex ml-4 items-center justify-between mr-4'>
                      <div className='p-1 flex items-center justify-center mr-4'>
                        <button
                          className='ml-2 flex justify-center rounded-lg bg-yellow-400 p-2 w-28'
                          onClick={toggleBtn}
                        >
                          <UserPlusIcon
                            className='h-6 w-6 mr-1'
                            aria-hidden='true'
                          />
                          {followIsLoading || unFollowIsLoading ? (
                            <RotatingLines
                              strokeColor='grey'
                              strokeWidth='5'
                              animationDuration='1'
                              width='20'
                              visible={true}
                            />
                          ) : data.followStatus ? (
                            'Unfollow'
                          ) : (
                            'Follow'
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className='flex mt-4'>
                  <div className='flex items-center justify-center'>
                    <button className='flex'>
                      <span className='lg:text-xl text-lg'>
                        <b>{data?.postCount} </b>Post
                      </span>
                    </button>
                  </div>

                  <div className='flex items-center justify-center ml-8'>
                    <button
                      className='flex'
                      onClick={() => {
                        SetShowFollowingList((prev) => !prev);
                        SetShowFollowersList(false);
                      }}
                    >
                      <span className='lg:text-xl text-lg'>
                        <b>{data.user.following?.length || 0} </b>
                        Following
                      </span>
                    </button>
                  </div>

                  <div className='items-center justify-center ml-8'>
                    <button
                      className='flex'
                      onClick={() => {
                        SetShowFollowersList((prev) => !prev);
                        SetShowFollowingList(false);
                      }}
                    >
                      <span className='lg:text-xl text-lg'>
                        <b>{data.user.followers?.length || 0} </b>Followers
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {showFollowingList && data.followingDetails.length > 0 && (
              <FollowersList
                user={data.followingDetails}
                onClose={handleFollowingListClose}
              />
            )}
            {showFollowersList && data.followerDetails.length > 0 && (
              <FollowersList
                user={data.followerDetails}
                onClose={handleFollowersListClose}
              />
            )}
          </div>

          {currentUser === data?.user?.username && (
            <>
              <div className='lg:w-3/4 w-full h-4 lg:my-10 mt-8 flex justify-center items-center'>
                <img
                  className='rounded-full w-12 h-12 mr-4'
                  src={data.user.picture ? data.user.picture : logo}
                  alt='logo'
                  referrerPolicy='no-referrer'
                />
                <div
                  className='w-3/4 rounded-2xl flex justify-center items-center p-2 cursor-pointer border-2 border-gray-700 hover:border-red-500 hover:border-4 hover:border-doublee'
                  onClick={createPostBox}
                >
                  <span className='text-gray-600 text-md tracking-widest hover:text-white'>
                    Click To Create Post
                  </span>
                </div>
              </div>
              <div className='flex justify-center -mt-72 z-50'>
                {inputBox && (
                  <InputBox
                    close={createPostBox}
                    showAddPost={true}
                    profilePic={data.user.picture}
                    method={'POST'}
                    value={inputText}
                    inputValue={(e) => setInputText(e.target.value)}
                    handleImageChange={handlePostImageChange}
                    previewUrl={postImagePreview}
                    makePost={makePost}
                    spinner={
                      <RotatingLines
                        strokeColor='grey'
                        strokeWidth='5'
                        animationDuration='1'
                        width='20'
                        visible={true}
                      />
                    }
                    loading={createPostStatus.isLoading}
                  />
                )}
              </div>
            </>
          )}

          <div className='h-auto w-5/6 rounded-2xl lg:py-10 my-20 grid place-items-center'>
            {data?.postData?.length > 0 ? (
              data.postData.map((post, i) => {
                return (
                  <UserPost
                    key={post._id}
                    id={post._id}
                    profile={data.user.picture ? data.user.picture : logo}
                    name={data.user.name}
                    username={data.user.username}
                    text={post.text}
                    userPostImage={post.image}
                    time={post.time}
                    mujib={post.likeStatus}
                    likes={post.likeCount}
                    like={() => {
                      if (!isFetching && post.likeStatus) {
                        return unlike(post._id);
                      } else {
                        return like(post._id);
                      }
                    }}
                    commentValue={commentText}
                    inputValue={(e) => setCommentText(e.target.value)}
                    disabled={isLoadingD}
                    comment={(e) => handleComment(e, post._id)}
                    postLink={post._id}
                  >
                    {id === data.user._id ? (
                      <DropDown
                        showEditButton={true}
                        delete={() => deletePost(post._id)}
                        postId={post._id}
                      />
                    ) : null}

                    <div className='gif-box ml-2 z-10' key={post._id}>
                      <Gif
                        key={post._id}
                        id={post._id}
                        showGrid={showGrid}
                        handleGIFButtonClick={handleGIFButtonClick}
                        searchInputTerm={searchInputTerm}
                        handleChange={handleChange}
                        handleGoBack={handleGoBack}
                        categories={categories}
                        isSearchResult={isSearchResult}
                        commentGif={commentGif}
                        getGifSrc={(e) => getGifSrc(e, post._id)}
                      />
                    </div>

                    {post.comments.length > 0
                      ? post.comments.map((comment, i) => {
                          return (
                            <UserComment
                              key={comment._id}
                              profile={comment.picture ? comment.picture : logo}
                              time={post.commentTime[i].time}
                              name={comment.name}
                              username={comment.username}
                              text={comment.text ? comment.text : null}
                              gif={comment.gifUrl ? comment.gifUrl : null}
                            >
                              {id === data.user._id ? (
                                <DropDown
                                  showEditButton={true}
                                  delete={() => deleteComment(comment._id)}
                                  postId={comment._id}
                                />
                              ) : null}
                            </UserComment>
                          );
                        })
                      : null}

                    {post.comments.length > 0 && (
                      <div className='text-blue-600 flex justify-center underline'>
                        <Link to={`/post/${post._id}`}>View all comments</Link>
                      </div>
                    )}
                  </UserPost>
                );
              })
            ) : (
              <h1 className='text-center text-4xl'>No Post Found</h1>
            )}
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default UserProfile;
