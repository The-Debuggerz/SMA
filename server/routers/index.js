const router = require('express').Router();
const userRouter = require('./user/');

router.use('/auth', userRouter);

module.exports = router;
