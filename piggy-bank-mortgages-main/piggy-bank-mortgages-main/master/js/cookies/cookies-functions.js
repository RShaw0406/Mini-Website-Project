export const getCookiesSettings = () => {
  // Checks the browser for cookie settings
  const successMessage = document.getElementById('successMessage');
  successMessage.style.display = 'none';
  // Get Cookie
  const piggyBankCookie = getCookies('_PiggyBank_Cookie_Preference');
  //Check if Cookies have been accepted
  if (piggyBankCookie === '_ga_G-QCX3G9KSPC=1,_ga=1') {
    document.getElementById('GAradio1').checked = true;
    document.getElementById('GAradio2').checked = false;
  }
  // Check if Cookies have been rejected
  else if (piggyBankCookie === '_ga_G-QCX3G9KSPC=0,_ga=0') {
    document.getElementById('GAradio1').checked = false;
    document.getElementById('GAradio2').checked = true;
  }
  // Cookies have not been selected yet
  else {
    document.getElementById('GAradio1').checked = false;
    document.getElementById('GAradio2').checked = false;
  }
};

export const gtag = (config, Property_id) => {
  // Handles the pushing of configuration to the dataLayer
  dataLayer.push(config);
  dataLayer.push(Property_id);
};

export const getCookies = (cname) => {
  // Retrieves the cookies and decodes them, returning a substring
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    // Return Cookies
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  // Cookies not found return null
  return '';
};

export const radioSetCookies = () => {
  // Sets the cookies depending on the checked radio button
  const successMessage = document.getElementById('successMessage');
  const cname = '_PiggyBank_Cookie_Preference';
  const exdays = 365;
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  let cvalue;
  if (document.getElementById('GAradio1').checked) {
    // Set Google Analytics to ON
    cvalue = '_ga_G-QCX3G9KSPC=1,_ga=1';
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/' + ';secure';
    window.dataLayer = window.dataLayer || [];
    gtag('js', new Date());
    gtag('config', 'G-QCX3G9KSPC');
    successMessage.style.display = 'block';
  } else {
    // Set Google Analytics to OFF
    cvalue = '_ga_G-QCX3G9KSPC=0,_ga=0';
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/' + ';secure';
    // Delete Google Analytics Cookies
    document.cookie = '_ga_G-QCX3G9KSPC=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    successMessage.style.display = 'block';
  }
};
