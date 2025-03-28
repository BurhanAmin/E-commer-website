const express = require('express')
const mongoose = require('mongoose');
const path = require("path");
const User = require('./models/User')
const Book = require('./models/Book')

const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/foeprojects", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, 
})
.then(() => console.log("MongoDB Connected!"))
.catch(err => console.error("MongoDB Connection Failed:", err));

app.use(express.json());
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")));

app.engine('html', require('ejs').renderFile);

let cart = []

app.get('/', (req, res)=>{
    res.render(__dirname+'/index.html')
})

app.get('/login', (req, res)=>{
  res.render(__dirname+'/login.html')
})

app.get('/books', (req, res)=>{
  res.render(__dirname+'/books.html')
})

app.get('/cart', (req, res) => {
  res.render('cart', { cart });
})
app.get('/aboutus', (req, res)=>{
  res.render(__dirname+'/aboutus.html')
})

app.get('/checkout', (req, res) => {
  res.sendFile(__dirname + '/checkout.html');
});

app.post('/api/addtocart', (req, res) => {
  cart.push(req.body);
  res.send("added");
  console.log(cart);
})

app.post('/api/createuser', async (req, res) => {
    try{
        console.log(req.body)
        const {  } = req.body;
        const newUser = new User({
          fname, lname, email, password
        });
        const savedUser = await newUser.save(); 
        res.status(201).json({ message: "User created successfully!", user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.get('/api/getbooks', async (req, res) => {
  try{
      const items = await Book.find();
      res.json(items)
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
})

app.listen(3000, ()=>{
    console.log("App listening on port 3000...")
})