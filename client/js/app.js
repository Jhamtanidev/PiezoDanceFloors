
const dashboardLink = document.getElementById("dashboardlink");
const logoutLink = document.querySelector('.logout-link');
const loginLink = document.querySelector('.login-link');
function isLoggedIn() {
  const token = localStorage.getItem('token');
  console.log('Token:', token); // Debugging log
  return !!token;
}

// Check if the user is logged in

function updateNavLinks() {
  console.log('Updating navigation links based on login status'); // Debugging log
  if (isLoggedIn()) {
    console.log('User is logged in'); // Debugging log
    
    dashboardLink.style.display = 'inline';
    logoutLink.style.display = 'inline';
    loginLink.style.display = 'hidden';
  } else {
    
    console.log('User is not logged in'); // Debugging log
    dashboardLink.style.display = 'hidden';
    logoutLink.style.display = 'none';
    loginLink.style.display = 'inline';
  }
}
updateNavLinks();
// Add event listeners
// dashboardLink.addEventListener('click', (event) => {
//   event.preventDefault();
 
//   if(isLoggedIn()){
//     navigateTo('dashboard.html');
//   };
// });

// logoutLink.addEventListener('click', (event) => {
//   event.preventDefault();
//   logout();
//   navigateTo('index.html');
// });
// const logoutLink = document.getElementById('logout-link');

logoutLink.addEventListener('click', async (event) => {
  event.preventDefault();
  await logout();
  updateNavLinks(); // Update the nav links after logout
  window.location.href = 'index.html'; // Redirect the user to the home page
});
async function logout() {
  try {
    await fetch('https://pizo-dance.vercel.app/api/auth/logout', {
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
// function isLoggedIn() {
//   // Check if the user has a valid JWT token
  
//   return localStorage.getItem('token');
// }

function navigateTo(page) {
  window.location.href = page;
}