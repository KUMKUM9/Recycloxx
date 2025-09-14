import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/recycleapp';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', userSchema);

// Listing Schema
const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: Number,
  image: String,
  owner: String // email of user
});
const Listing = mongoose.model('Listing', listingSchema);

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: 'Email already exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash });
  res.json({ message: 'Registered', user: { email: user.email } });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ message: 'Logged in', token, user: { email: user.email } });
});

// Listings routes
app.get('/api/listings', async (req, res) => {
  const listings = await Listing.find();
  res.json(listings);
});

app.post('/api/listings', async (req, res) => {
  const { title, description, category, price, image, owner } = req.body;
  if (!title || !description || !price) return res.status(400).json({ error: 'Missing fields' });
  const listing = await Listing.create({ title, description, category, price, image, owner });
  res.json(listing);
});

app.get('/api/listings/:id', async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ error: 'Not found' });
  res.json(listing);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
