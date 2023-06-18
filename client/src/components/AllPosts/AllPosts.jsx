import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Gif from '../GIF/Gif';
import logo from '../../assets/logo.png';
import UserPost from '../UserPost/UserPost';
import UserComment from '../UserPost/Comments';
import DropDown from '../UserPost/DropDown';
import Loader from '../Loader/Loader';
import { useGetAllPostsQuery } from '../../Store/AllPosts';
import { useLikeMutation, useUnlikeMutation } from '../../Store/UsersPostApi';
import {
  usePostCommentMutation,
  useDeleteCommentMutation,
} from '../../Store/ProfileApi';
import useComponentLogic from '../../util/useComponentLogic';

const AllPosts = () => {
  const {
    commentText,
    setCommentText,
    showGrid,
    setShowGrid,
    categories,
    setCategories,
    searchInputTerm,
    setSearchInputTerm,
    isShowingOriginal,
    setIsShowingOriginal,
    originalCategories,
    setOriginalCategories,
    isSearchResult,
    setIsSearchResult,
    handleGIFButtonClick,
    commentGif,
    handleGoBack,
    handleChange,
    getGifSrc,
  } = useComponentLogic();

  const { id } = useSelector((state) => state.auth);

  const { data, isLoading, refetch } = useGetAllPostsQuery();
  const [like] = useLikeMutation();
  const [unlike] = useUnlikeMutation();
  const [createComment] = usePostCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  if (isLoading) return <Loader />;

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

  return (
    <>
      <div className='grid place-items-center h-full'>
        <div className='h-auto w-5/6 rounded-2xl py-12 my-12 grid place-items-center'>
          {data?.user?.length > 0 ? (
            data.user.map((post) => {
              let { _doc, time } = post;
              return (
                <UserPost
                  key={_doc._id}
                  id={_doc._id}
                  name={_doc.user.name}
                  username={_doc.user.username}
                  profile={_doc.user.picture ? _doc.user.picture : logo}
                  text={_doc.text}
                  userPostImage={_doc.image}
                  time={time}
                  likes={post.likeCount}
                  mujib={post.likeStatus}
                  like={() => {
                    if (post.likeStatus) {
                      return unlike(_doc._id) && refetch();
                    } else {
                      return like(_doc._id) && refetch();
                    }
                  }}
                  commentValue={commentText}
                  inputValue={(e) => setCommentText(e.target.value)}
                  disabled={isLoading}
                  comment={(e) => handleComment(e, _doc._id)}
                  postLink={_doc._id}
                  // GIF PROPS
                  postId={post._id}
                  searchInputTerm={searchInputTerm}
                  handleChange={handleChange}
                  handleGoBack={handleGoBack}
                  categories={categories}
                  isSearchResult={isSearchResult}
                  commentGif={commentGif}
                  getGifSrc={(e) => getGifSrc(e, _doc._id)}
                >
                  {id === _doc.user._id ? (
                    <DropDown
                      showEditButton={true}
                      delete={() => deletePost(post._doc._id)}
                      postId={_doc._id}
                    />
                  ) : null}

                  <div className='gif-box ml-2 z-50'>
                    <Gif
                      key={_doc._id}
                      postId={_doc._id}
                      showGrid={showGrid}
                      handleGIFButtonClick={handleGIFButtonClick}
                      searchInputTerm={searchInputTerm}
                      handleChange={handleChange}
                      handleGoBack={handleGoBack}
                      categories={categories}
                      isSearchResult={isSearchResult}
                      commentGif={commentGif}
                      getGifSrc={(e) => getGifSrc(e, _doc._id)}
                    />
                  </div>

                  {_doc.comments.length > 0
                    ? _doc.comments.map((comment, i) => {
                        return (
                          <UserComment
                            key={comment._id}
                            profile={comment.picture ? comment.picture : logo}
                            time={data?.user[i]?.commentTime[i]?.time}
                            name={comment.name}
                            username={comment.username}
                            text={comment.text ? comment.text : null}
                            gif={comment.gifUrl ? comment.gifUrl : null}
                          >
                            <DropDown
                              delete={(e) =>
                                deleteCommentHandler(e, comment._id)
                              }
                              postId={comment._id}
                            />
                          </UserComment>
                        );
                      })
                    : null}

                  {_doc.comments.length > 0 && (
                    <div className='text-blue-600 flex justify-center underline'>
                      <Link to={`/post/${post._doc._id}`}>
                        View all comments
                      </Link>
                    </div>
                  )}
                </UserPost>
              );
            })
          ) : (
            <div className='bg-red-600 px-20 py-12 rounded-3xl'>
              <h1 className='text-center text-4xl font-semibold'>
                No Post Found
              </h1>
              <div className='text-center text-2xl text-gray-100 mt-12 font-semibold'>
                Follow{' '}
                <Link to={`/profile/mujib`}>
                  <span className='text-3xl text-gray-900 font-bold hover:text-black'>
                    MUJIB
                  </span>
                </Link>{' '}
                To See Post
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllPosts;
