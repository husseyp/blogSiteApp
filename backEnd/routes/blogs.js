const express = require('express')
const router = express.Router();

const  { getBlogs,addComment,postBlog } = require('../controllers/blogs.js');

const auth = require("../middleware/auth.js");

router.get('/', auth, getBlogs);

router.post('/',auth, postBlog);

router.put('/',auth, addComment);


module.exports = router ;


