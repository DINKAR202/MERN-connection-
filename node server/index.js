const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/dk', {
    useNewUrlParser: true, useUnifiedTopology: true});
  console.log("db cennected");

}

const userSchema = new mongoose.Schema({
  username: String,
  password: String
  // email: String
});

const User = mongoose.model('User', userSchema);


const server = express();


server.use(cors());
server.use(bodyParser.json());

server.post('/demo',async (req,res)=>{

    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    // user.email = req.body.email;
    const doc = await user.save();

    console.log(doc)    
    res.json(doc);
})

server.get('/demo',async (req,res) => {
  const docs = await User.find({}); 
  res.json(docs)
})

server.listen(5050,() => {
    console.log("server started")
})