const mongoose = require('mongoose')

const express = require('express');
var cors = require('cors')

const app = express();

app.use(cors())


const blogs_routes = require('./routes/blogs.js')
const users_routes = require('./routes/users.js')



const uri = "mongodb+srv://harshpatelhp817:0OZWHpKr0o1yIOMr@cluster0.oawgzlc.mongodb.net/blogWebiste";

mongoose.connect(uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then((data)=> {
    console.log('Connected successfully');
}).catch((err)=> console.log(err,'Failed connection'))


app.use(express.json())

app.use('/api/blogs', blogs_routes)

app.use('/api/users', users_routes)


app.get('/', (req, res) => {
    res.send('Welcome to my Project !!');
  });

app.listen(process.env.PORT || "5000", () => console.log('Example app is listening on port 3000.'));