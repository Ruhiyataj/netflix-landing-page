import { registerUser, loginUser, getTrending, getPopular, getTopRated, getNetflixOriginals, getImageUrl } from './api.js';
import { saveAuth, getUsername, logout } from './auth.js';

const app = document.getElementById('app');

export function showRegister() {
  app.innerHTML = `
    <div class="auth-container">
      <div class="auth-box">
        <h2>Sign Up</h2>
        <div id="error-container"></div>
        <form id="register-form">
          <div class="form-group">
            <label>Username</label>
            <input type="text" name="username" placeholder="Enter username" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter password" required>
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" placeholder="Enter phone number" required>
          </div>
          <button type="submit" class="btn">Register</button>
        </form>
        <div class="switch-auth">
          Already have an account? <a id="switch-login">Sign In</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('register-form').addEventListener('submit', handleRegister);
  document.getElementById('switch-login').addEventListener('click', showLogin);
}

export function showLogin() {
  app.innerHTML = `
    <div class="auth-container">
      <div class="auth-box">
        <h2>Sign In</h2>
        <div id="error-container"></div>
        <form id="login-form">
          <div class="form-group">
            <label>Username</label>
            <input type="text" name="username" placeholder="Enter username" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter password" required>
          </div>
          <button type="submit" class="btn">Sign In</button>
        </form>
        <div class="switch-auth">
          New to Netflix? <a id="switch-register">Sign up now</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('login-form').addEventListener('submit', handleLogin);
  document.getElementById('switch-register').addEventListener('click', showRegister);
}

async function handleRegister(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userData = {
    username: formData.get('username'),
    password: formData.get('password'),
    phone: formData.get('phone')
  };

  console.log('Attempting registration with:', userData);

  try {
    const result = await registerUser(userData);
    console.log('Registration successful:', result);
    alert('Registration successful! Please login.');
    showLogin();
  } catch (error) {
    console.error('Registration error:', error);
    showError(error.message);
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const username = formData.get('username');
  const password = formData.get('password');

  try {
    const result = await loginUser(username, password);
    saveAuth(result.userId, result.username);
    showNetflix();
  } catch (error) {
    showError(error.message);
  }
}

function showError(message) {
  const errorContainer = document.getElementById('error-container');
  errorContainer.innerHTML = `<div class="error-message">${message}</div>`;
}

export async function showNetflix() {
  app.innerHTML = `
    <div class="netflix-container">
      <nav class="navbar" id="navbar">
        <div class="logo">NETFLIX</div>
        <div class="user-info">
          <span>Welcome, ${getUsername()}</span>
          <button class="logout-btn" id="logout-btn">Logout</button>
        </div>
      </nav>
      <div id="hero" class="hero">
        <div class="hero-content">
          <h1 class="hero-title" id="hero-title">Loading...</h1>
          <p class="hero-overview" id="hero-overview"></p>
          <div class="hero-buttons">
            <button class="play-btn">▶ Play</button>
            <button class="info-btn">ℹ More Info</button>
          </div>
        </div>
      </div>
      <div class="movie-section">
        <h2 class="section-title">Trending Now</h2>
        <div class="movie-row" id="trending-row"></div>
      </div>
      <div class="movie-section">
        <h2 class="section-title">Popular on Netflix</h2>
        <div class="movie-row" id="popular-row"></div>
      </div>
      <div class="movie-section">
        <h2 class="section-title">Top Rated</h2>
        <div class="movie-row" id="toprated-row"></div>
      </div>
    </div>
  `;

  document.getElementById('logout-btn').addEventListener('click', logout);
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  loadMovies();
}

async function loadMovies() {
  try {
    const [trending, popular, topRated, originals] = await Promise.all([
      getTrending(),
      getPopular(),
      getTopRated(),
      getNetflixOriginals()
    ]);

    // Set hero banner
    const heroMovie = trending.results[0];
    if (heroMovie) {
      document.getElementById('hero').style.backgroundImage = `url(${getImageUrl(heroMovie)})`;
      document.getElementById('hero-title').textContent = heroMovie.Title;
      document.getElementById('hero-overview').textContent = heroMovie.Plot || 'No description available';
    }

    // Render movie rows
    renderMovieRow('trending-row', trending.results);
    renderMovieRow('popular-row', popular.results);
    renderMovieRow('toprated-row', topRated.results);
  } catch (error) {
    console.error('Error loading movies:', error);
  }
}

function renderMovieRow(containerId, movies) {
  const container = document.getElementById(containerId);
  container.innerHTML = movies.map(movie => `
    <div class="movie-card">
      <img src="${getImageUrl(movie)}" alt="${movie.Title}">
    </div>
  `).join('');
}
