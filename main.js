import { showRegister, showLogin, showNetflix } from './components.js';
import { checkAuth } from './auth.js';

// Initialize app
function init() {
  const isLoggedIn = checkAuth();
  
  if (isLoggedIn) {
    showNetflix();
  } else {
    showRegister(); // Start with registration page
  }
}

init();
