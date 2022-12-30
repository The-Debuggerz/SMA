import { useSelector } from 'react-redux';
import {
  useFollowingUsersPostQuery,
  useLikeMutation,
  useUnlikeMutation,
  useDeletePostMutation,
} from '../../Store/UsersPostApi';

import UserPost from '../UserPost/UserPost';
import Loader from '../Loader/Loader';
import DropDown from '../UserPost/DropDown';

const HomePage = () => {
  const { id } = useSelector((state) => state.auth);
  const { data, isLoading, error, isFetching } = useFollowingUsersPostQuery(
    null,
    {
      pollingInterval: 5000,
    }
  );

  const [deletePost] = useDeletePostMutation();
  const [like] = useLikeMutation();
  const [unlike] = useUnlikeMutation();

  if (isLoading) return <Loader />;

  if (error) return <h1>{error.message}</h1>;

  // console.log('🚀 HomePage', data);

  return (
    <div className='grid place-items-center h-screen'>
      <div className='h-auto w-5/6 bg-red-600 rounded-2xl py-12 my-12 grid place-items-center'>
        {data?.user?.length > 0 ? (
          data.user.map((post) => {
            let { _doc, time } = post;
            return (
              <UserPost
                userID={_doc.user._id}
                key={_doc._id}
                id={_doc._id}
                name={_doc.user.name}
                username={_doc.user.username}
                text={_doc.text}
                time={time}
                likes={post.likeCount}
                mujib={post.likeStatus}
                like={() => {
                  if (post.likeStatus) {
                    return unlike(_doc._id);
                  } else {
                    return like(_doc._id);
                  }
                }}
              >
                {id === _doc.user._id && (
                  <DropDown
                    delete={() => deletePost(post._doc._id)}
                    postId={_doc._id}
                  />
                )}
              </UserPost>
            );
          })
        ) : (
          <h1 className='text-center text-4xl'>No Post Found</h1>
        )}
      </div>
    </div>
  );
};

export default HomePage;
