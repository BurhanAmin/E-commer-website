const express = require('express')
const { MongoClient } = require('mongodb');
const User = require('./models/User')

const uri = "mongodb+srv://burhanuddin:burhanuddin@cluster0.1fngs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri);

const app = express()

async function run() {
    try {
      await client.connect();
      const db = client.db('Library');
      const collection = db.collection('users');
  
      // Find the first document in the collection
      console.log("Database connected")
    } finally {
      // Close the database connection when finished or an error occurs
      await client.close();
    }
  }
  run().catch(console.error);

app.engine('html', require('ejs').renderFile);

app.get('/', (req, res)=>{
    res.render(__dirname+'/index.html')
})

app.post('/create', async (req, res) => {
    try{
        const newUser = new User(req.body);
        const savedUser = await newUser.save(); 
        console.log("user created!")
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.listen(3000, ()=>{
    console.log("App listening on port 3000...")
})