const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogId: { type: String, unique: true },
  userId: { type: String, default: null },
  content: { type: String, default: null },
  title: { type: String, default: null },
  publishedOn :  { type: String, default: null },
  comments : [
    {
      userId : { type: String, default: null },
      description : { type: String, default: null },
    }
  ]
});

module.exports = mongoose.model("blog", blogSchema);