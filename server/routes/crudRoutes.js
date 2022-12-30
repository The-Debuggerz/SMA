const express = require('express');
const router = express.Router();

const { createPost, editPost, updatePost, deletePost } = require('../controllers/crud');
const authentication = require('../middleware/check-auth');

router.use(authentication);

router.post('/create-post', createPost);

router.get('/edit-post/:id', editPost);

router.put('/edit-post', updatePost);

router.delete('/delete-post', deletePost);

module.exports = router;
