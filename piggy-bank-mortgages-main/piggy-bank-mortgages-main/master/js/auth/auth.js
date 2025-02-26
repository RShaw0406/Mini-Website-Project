const credentials = [
  {
    email: 'admin@piggybankmortgages.com',
    password: 'testPassword@123',
  },
];

export const validateUser = (email, password) => {
  // Validates the user input and returns true or false based on whether it matches
  for (const entry of credentials) {
    if (entry.email === email && entry.password === password) {
      return true;
    }
  }
  return false;
};

export const clearLoginCreds = () => {
  // Sets the session storage item "signedIn" to "false" and redirects the user to the homepage
  sessionStorage.setItem('signedIn', 'false');
  window.location.href = '../html/Home.html'
};

document.getElementById('sign-out').addEventListener('click', clearLoginCreds)

export const checkSignInStatus = () => {
  // Handles the html classes depending on whether the user is signed in or not
  if (sessionStorage.getItem('signedIn') === 'true'){
    document.getElementById('sign-in').classList.add('d-none')
    document.getElementById('sign-out').classList.remove('d-none')
  } else {
    document.getElementById('sign-in').classList.remove('d-none')
    document.getElementById('sign-out').classList.add('d-none')
  }
};
