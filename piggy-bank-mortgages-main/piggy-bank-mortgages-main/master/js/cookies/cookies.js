import { getCookiesSettings, radioSetCookies } from './cookies-functions.js';

document.addEventListener('DOMContentLoaded', () => {
  getCookiesSettings();
});

document.getElementById('btnSaveCookies').addEventListener('click', (e) => {
  radioSetCookies();
});
