import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

// Local JSON database file
const DB_FILE = 'users.json';

// Initialize local database
function initDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }, null, 2));
    console.log('✅ Created local users database');
  } else {
    console.log('✅ Local users database found');
  }
}

// Read users from file
function getUsers() {
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data).users;
}

// Write users to file
function saveUsers(users) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ users }, null, 2));
}

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, password, phone } = req.body;
  
  if (!username || !password || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    const users = getUsers();
    
    // Check if username already exists
    if (users.find(u => u.username === username)) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = {
      user_id: users.length + 1,
      username,
      password: hashedPassword,
      phone,
      created_at: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    console.log(`✅ User registered: ${username}`);
    
    res.status(201).json({ 
      message: 'Registration successful',
      userId: newUser.user_id 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  
  try {
    const users = getUsers();
    
    // Find user
    const user = users.find(u => u.username === username);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    console.log(`✅ User logged in: ${username}`);
    
    res.json({ 
      message: 'Login successful',
      userId: user.user_id,
      username: user.username
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Start server
const PORT = 3000;
initDatabase();
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('📝 Using local JSON file for user storage');
});
