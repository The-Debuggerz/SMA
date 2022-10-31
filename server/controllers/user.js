const { Post } = require('../models/index');
const { User } = require('../models/index');

exports.profile = async (req, res) => {
  // try {
  //   const userId = req.params.id;
  //   console.log('userId', userId);

  //   const profile = User.findById(req.params.id).select('-password');
  //   console.log('🚀 profile', profile);

  // if (!profile) {
  //   return res.status(400).josn({ message: 'There is no profile for this user' });
  // }

  //   res.json(profile);
  // } catch (error) {
  //   console.log(error.message);
  //   res.status(500).send('server error');
  // }

  try {
    const user = await User.findOne({ username: req.params.id });
    console.log('🚀 ~ file: authRoutes.js ~ line 24 ~ router.get ~ user', user);

    if (!user) {
      console.log('There is no profile for this user');
      return res.status(401).json({ message: 'There is no profile for this user' });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
};

exports.deleteProfile = async (req, res) => {
  console.log('req.user._id', req.user._id);
  try {
    const profile = await User.findOneAndRemove({ _id: req.user._id });
    console.log('🚀 ~ line 41 ~ router.get ~ user', profile);

    if (!profile) {
      console.log('There is no profile for this user');
      return res.status(401).json({ message: 'There is no profile for this user' });
    }

    res.json({ message: 'user profile deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
};

exports.isLoggedIn = async (req, res) => {
  return res.status(200).send({
    message: 'Login Successfull',
    isLoggedIn: true,
    token: req.token,
  });
};

exports.userPosts = async (req, res) => {
  if (req.user) {
    Post.find({}).then(data => {
      // console.log(`Sending ${data.length} Post Packets!`);
      // console.log(data);
      res.json(data);
    });
  } else {
    res.status(401).json({ message: 'unauthoroze' });
  }
};

exports.isFollow = async (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ message: err });
      }

      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      )
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  );
};
