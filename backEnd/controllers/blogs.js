const Blog = require("../model/blog");
const mongoose = require("mongoose");



const getBlogs = (async (req, res) => {

    const allBlogs =  await Blog.find();
    res.json(allBlogs)
})

const addComment = (async (req, res) => {
    try {
        // Get user input
        const { blogId, description, userId  } = req.body;
        const blog =  await Blog.findOne({blogId});

        blog.comments.push({
            'userId': userId,
            'description' : description
        })

        const filter = { blogId };

        const doc = await Blog.findOneAndUpdate(filter, blog)
        res.status(201).json(doc);

    }catch (err) {
        console.log(err);
      }
})

const postBlog = (async (req, res) => {

    try {
        // Get user input
        const { userId, content, title } = req.body;

        if (!(userId && content && title)) {
            res.status(400).send("All input is required");
          }
      

          const blog = await Blog.create({
            blogId : new mongoose.mongo.ObjectId(),
            publishedOn : new Date().toISOString(),
            userId,
            content,
            title,
          });
      
          res.status(201).json(blog);


    }catch (err) {
        console.log(err);
    }

       
    
})


module.exports = {
    getBlogs, 
    addComment,
    postBlog
};