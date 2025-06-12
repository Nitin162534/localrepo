const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const Product = require('./models/Product');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get all products
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Register user
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  res.json({ success: true });
});

// Login user (very basic example)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ success: false });
  const match = await bcrypt.compare(password, user.password);
  if (match) return res.json({ success: true });
  res.status(401).json({ success: false });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
