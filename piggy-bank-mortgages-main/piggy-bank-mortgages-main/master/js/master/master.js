import { checkSignInStatus } from '../auth/auth.js';
import { getCookies } from '../cookies/cookies-functions.js';

export const setCookiesConsent = () => {
  // Sets the cookies depending on what the user has chosen
  // Get Cookie
  let piggyBankCookie = getCookies('_PiggyBank_Cookie_Preference');
  const cookieConsent = document.getElementById('cookieConsent');
  const cookieOverlay = document.getElementById('cookieOverlay');
  //Check if Cookies have been accepted
  if (piggyBankCookie === '_ga_G-QCX3G9KSPC=1,_ga=1') {
    cookieConsent.style.display = 'none';
    cookieOverlay.style.display = 'none';
  }
  // Check if Cookies have been rejected
  else if (piggyBankCookie === '_ga_G-QCX3G9KSPC=0,_ga=0') {
    cookieConsent.style.display = 'none';
    cookieOverlay.style.display = 'none';
  }
  // Cookies have not been selected yet
  else {
    cookieConsent.style.display = 'block';
    cookieOverlay.style.display = 'block';
  }
};

export const acceptCookies = () => {
  // Handles when a user accepts cookies, pushing the configuration to the dataLayer
  const cookieConsent = document.getElementById('cookieConsent');
  const cookieOverlay = document.getElementById('cookieOverlay');
  // Set Google Analytics to ON
  const cname = '_PiggyBank_Cookie_Preference';
  const cvalue = '_ga_G-QCX3G9KSPC=1,_ga=1';
  const exdays = 365;
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/' + ';secure';
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line func-style, prefer-arrow/prefer-arrow-functions
  function gtag() {
    // eslint-disable-next-line no-undef
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-QCX3G9KSPC');
  // Hide Cookies Consent Banner
  cookieConsent.style.display = 'none';
  cookieOverlay.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
  setCookiesConsent();
});

document.getElementById('btnAcceptCookies').addEventListener('click', () => {
  acceptCookies();
});

document.getElementById('sign-in').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '../html/SignIn.html';
});

checkSignInStatus();
