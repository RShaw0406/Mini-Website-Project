import { validateUser } from '../auth/auth.js';

const buttonSignIn = document.getElementById('buttonSignIn');
const failSignIn = document.getElementById('failSignIn');

buttonSignIn.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;
  const validated = validateUser(email, password);
  if (!validated) {
    failSignIn.style.display = 'block';
    sessionStorage.setItem('signedIn', 'false');
  } else {
    failSignIn.style.display = 'none';
    sessionStorage.setItem('signedIn', 'true');
    window.location.href = '../html/Home.html';
  }
});
