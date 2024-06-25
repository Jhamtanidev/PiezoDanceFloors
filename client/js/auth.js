// Register a new user
async function register(name, email, password) {
    try {
      const response = await fetch('https://pizo-dance.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name:name, email:email, password:password })
      });
      const data = await response.json();
      console.log("hello");
      if (response.ok) {
        // Save the JWT token to localStorage
        localStorage.setItem('token', data.token);
        return data.user;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }
  
  // Log in a user
  async function login(email, password) {
    try {
      const response = await fetch('https://pizo-dance.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email:email, password:password })
      });
      const data = await response.json();
      if (response.ok) {
        // Save the JWT token to localStorage
        localStorage.setItem('token', data.token);
        return data.user;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }
  
  // Log out a user
  // Logout function
// async function logout() {
//   try {
//     await fetch('/api/auth/logout', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     // Remove the token from local storage
//     localStorage.removeItem('token');
//   } catch (error) {
//     console.error('Error logging out:', error);
//   }
// }