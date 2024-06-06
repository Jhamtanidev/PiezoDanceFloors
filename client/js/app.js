// Get references to HTML elements
const dashboardLink = document.querySelector('#dashboard-link');
const logoutLink = document.querySelector('#logout-link');
const loginLink = document.querySelector('#login-link');

// Check if the user is logged in
if (isLoggedIn()) {
  // Show/hide links based on login status
  dashboardLink.style.display = 'inline';
  logoutLink.style.display = 'inline';
} else {
  dashboardLink.style.display = 'none';
  logoutLink.style.display = 'none';
  // loginLink.style.display = 'none';
}

// Add event listeners
dashboardLink.addEventListener('click', (event) => {
  event.preventDefault();
  // navigateTo('dashboard.html');
  isLoggedIn();
});

// logoutLink.addEventListener('click', (event) => {
//   event.preventDefault();
//   logout();
//   navigateTo('index.html');
// });
// const logoutLink = document.getElementById('logout-link');
logoutLink.addEventListener('click', async (event) => {
  event.preventDefault();
  console.log("hii");

  await logout();
  console.log("hii");
  window.location.href = 'index.html'; // Redirect the user to the home page
});
async function logout() {
  try {
    await fetch('http://localhost:8000/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    // Remove the token from local storage
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Error logging out:', error);
  }
}

// Helper functions
function isLoggedIn() {
  // Check if the user has a valid JWT token
  return !!localStorage.getItem('token');
}

function navigateTo(page) {
  window.location.href = page;
}