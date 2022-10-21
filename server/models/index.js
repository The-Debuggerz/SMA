const User = require('./lib/UserSchema');
const Post = require('./lib/PostSchema');
const Followers = require('./lib/FollowerSchema');
const FollowingUsers = require('./lib/FollowingSchema');
const Likes = require('./lib/LikeSchema');
const Conversations = require('./lib/ConversationSchema');

module.exports = {
  User,
  Post,
  Followers,
  FollowingUsers,
  Likes,
  Conversations,
};
