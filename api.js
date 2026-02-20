const API_BASE = 'http://localhost:3000/api';

export async function registerUser(userData) {
  console.log('Sending registration request to:', `${API_BASE}/register`);
  console.log('User data:', userData);
  
  try {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function loginUser(username, password) {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  
  return response.json();
}

// OMDB API
const OMDB_API_KEY = '89b0974';
const OMDB_BASE = 'http://www.omdbapi.com';

// Popular movie titles to fetch
const popularMovies = [
  'Inception', 'The Dark Knight', 'Interstellar', 'The Matrix', 'Pulp Fiction',
  'Fight Club', 'Forrest Gump', 'The Shawshank Redemption', 'The Godfather',
  'Gladiator', 'Avatar', 'Titanic', 'Jurassic Park', 'Star Wars', 'Iron Man'
];

const trendingMovies = [
  'Oppenheimer', 'Barbie', 'Dune', 'Spider-Man', 'Avengers',
  'Joker', 'Parasite', 'The Batman', 'Top Gun', 'Black Panther'
];

const topRatedMovies = [
  'The Shawshank Redemption', 'The Godfather', 'The Dark Knight',
  'Schindler\'s List', 'Pulp Fiction', 'The Lord of the Rings',
  'Forrest Gump', 'Inception', 'The Matrix', 'Goodfellas'
];

async function fetchMoviesByTitles(titles) {
  const promises = titles.map(title => 
    fetch(`${OMDB_BASE}/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`)
      .then(res => res.json())
      .catch(err => null)
  );
  
  const movies = await Promise.all(promises);
  return { results: movies.filter(m => m && m.Response !== 'False') };
}

export async function getTrending() {
  return fetchMoviesByTitles(trendingMovies);
}

export async function getPopular() {
  return fetchMoviesByTitles(popularMovies);
}

export async function getTopRated() {
  return fetchMoviesByTitles(topRatedMovies);
}

export async function getNetflixOriginals() {
  return fetchMoviesByTitles(popularMovies.slice(0, 10));
}

export function getImageUrl(movie) {
  return movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image';
}
