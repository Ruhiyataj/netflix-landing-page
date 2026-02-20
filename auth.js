// Authentication utilities
export function saveAuth(userId, username) {
  localStorage.setItem('userId', userId);
  localStorage.setItem('username', username);
  localStorage.setItem('isLoggedIn', 'true');
}

export function checkAuth() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

export function getUsername() {
  return localStorage.getItem('username');
}

export function logout() {
  localStorage.clear();
  window.location.reload();
}
