# Netflix Clone - Movie App with Authentication

A Netflix-style movie streaming app with user registration/login using OMDB API and Aiven MySQL database.

## Features

- ✨ Glassmorphic registration and login UI
- 🔐 Secure password hashing with bcrypt
- 🎬 OMDB API integration for movie data
- 🗄️ MySQL database (Aiven) for user management
- 📱 Responsive Netflix-style landing page
- 🎯 Auto-redirect after registration

## HOW TO RUN THE APP

### Step 1: Install Dependencies
Open terminal and run:
```bash
npm install
```

### Step 2: Start Backend Server
In the SAME terminal, run:
```bash
npm run server
```
Keep this terminal open! You should see:
- ✅ Connected to Aiven MySQL database
- ✅ Users table created/verified
- 🚀 Server running on http://localhost:3000

### Step 3: Start Frontend (Open NEW Terminal)
Open a NEW terminal window and run:
```bash
npm run dev
```
You should see a URL like: http://localhost:5173

### Step 4: Open Browser
Open your browser and go to: http://localhost:5173

## USING THE APP

### Registration:
1. You'll see the Sign Up page
2. Enter any username (example: john123)
3. Enter any password (example: password123)
4. Enter any phone number (example: 9876543210)
5. Click "Register"
6. You'll see "Registration successful!" alert

### Login:
1. After registration, you'll be on Sign In page
2. Enter the same username and password you just registered
3. Click "Sign In"
4. You'll see the Netflix landing page with movies!

## Example Test Data
- Username: testuser
- Password: test123
- Phone: 1234567890

## Configuration

- OMDB API Key: `89b0974`
- Database: Aiven MySQL (configured in server.js)
- Backend Port: 3000
- Frontend Port: 5173 (Vite default)

## Tech Stack

- Frontend: Vanilla JavaScript, Vite
- Backend: Node.js, Express
- Database: MySQL (Aiven)
- API: OMDB (Open Movie Database)
- Security: bcryptjs for password hashing

## Troubleshooting

If you see "Failed to fetch":
1. Make sure backend server is running (npm run server)
2. Check that you see the ✅ messages in the server terminal
3. Make sure you're using http://localhost:5173 in your browser
