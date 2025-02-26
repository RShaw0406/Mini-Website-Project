
beforeEach(() => {
  document.body.innerHTML = `<div id="successMessage"></div><input id="GAradio1" type="radio"><input id="GAradio2" type="radio"><button id="btnSaveCookies"></button>`;
});

afterEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

describe('Cookies tests', () => {
  describe('When getCookiesSettings is called', () => {
    it('should set the checked values correctly if cookies are selected', () => {
      // Arrange
      const gaRadio1 = document.getElementById('GAradio1');
      const gaRadio2 = document.getElementById('GAradio2');
      const cookies = require('../cookies-functions.js');
      const mockCookie =
        '_xsrf=2|4575d7cc|b501c301b2f84248920a7242bc9d2775|1677600834; _PiggyBank_Cookie_Preference=_ga_G-QCX3G9KSPC=1,_ga=1; _ga=GA1.1.592491872.1679919115; _ga_QCX3G9KSPC=GS1.1.1680029219.6.0.1680030027.0.0.0';
      jest.spyOn(document, 'cookie', 'get').mockReturnValueOnce(mockCookie);

      // Act
      cookies.getCookiesSettings();
      // Assert
      expect(gaRadio1.checked).toEqual(true);
      expect(gaRadio2.checked).toEqual(false);
    });
    it('should set the checked values correctly if cookies are rejected', () => {
      // Arrange
      const gaRadio1 = document.getElementById('GAradio1');
      const gaRadio2 = document.getElementById('GAradio2');
      const cookies = require('../cookies-functions.js');
      const mockCookie =
        '_xsrf=2|4575d7cc|b501c301b2f84248920a7242bc9d2775|1677600834; _PiggyBank_Cookie_Preference=_ga_G-QCX3G9KSPC=0,_ga=0; _ga=GA1.1.592491872.1679919115; _ga_QCX3G9KSPC=GS1.1.1680029219.6.0.1680030027.0.0.0';
      jest.spyOn(document, 'cookie', 'get').mockReturnValueOnce(mockCookie);

      // Act
      cookies.getCookiesSettings();
      // Assert
      expect(gaRadio1.checked).toEqual(false);
      expect(gaRadio2.checked).toEqual(true);
    });
    it('should set the checked values correctly if cookies are not selected yet', () => {
      // Arrange
      const gaRadio1 = document.getElementById('GAradio1');
      const gaRadio2 = document.getElementById('GAradio2');
      const cookies = require('../cookies-functions.js');
      const mockCookie = '';
      jest.spyOn(document, 'cookie', 'get').mockReturnValueOnce(mockCookie);

      // Act
      cookies.getCookiesSettings();
      // Assert
      expect(gaRadio1.checked).toEqual(false);
      expect(gaRadio2.checked).toEqual(false);
    });
  });
  describe('When getCookies is called', () => {
    it('should return the correct string when called with a valid cookie', () => {
      // Arrange
      const expectedResult = '_ga_G-QCX3G9KSPC=0,_ga=0';
      const mockCookie =
        '_xsrf=2|4575d7cc|b501c301b2f84248920a7242bc9d2775|1677600834; _PiggyBank_Cookie_Preference=_ga_G-QCX3G9KSPC=0,_ga=0; _ga=GA1.1.592491872.1679919115; _ga_QCX3G9KSPC=GS1.1.1680029219.6.0.1680030027.0.0.0';
      jest.spyOn(document, 'cookie', 'get').mockReturnValueOnce(mockCookie);
      const cookies = require('../cookies-functions.js');
      // Act
      const result = cookies.getCookies('_PiggyBank_Cookie_Preference');

      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('should return the correct string when called with an invalid cookie', () => {
      // Arrange
      const expectedResult = '';
      const mockCookie = 'test';
      jest.spyOn(document, 'cookie', 'get').mockReturnValueOnce(mockCookie);
      const cookies = require('../cookies-functions.js');
      // Act
      const result = cookies.getCookies('_PiggyBank_Cookie_Preference');

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('When radioSetCookies is called', () => {
    it('should set cookies correctly is GARradio1 is checked and window.dataLayer is set', () => {
      // Arrange
      document.body.innerHTML = `<div id="successMessage"></div><input id="GAradio1" type="radio" checked><button id="btnSaveCookies"></button>`;
      const mockPush = jest.fn();
      global.dataLayer.push = mockPush;
      const cookies = require('../cookies-functions.js');

      // Act
      cookies.radioSetCookies();

      // Assert
      expect(mockPush).toBeCalled();
      expect(document.getElementById('successMessage').style.display).toEqual('block');
    });
    it('should set cookies correctly is GARradio1 is checked and window.dataLayer is not set', () => {
      // Arrange
      document.body.innerHTML = `<div id="successMessage"></div><input id="GAradio1" type="radio" checked><button id="btnSaveCookies"></button>`;
      global.dataLayer = undefined;
      const cookies = require('../cookies-functions.js');

      // Act
      cookies.radioSetCookies();

      // Assert
      expect(document.getElementById('successMessage').style.display).toEqual('block');
    });
    it('should set cookies correctly is GARradio2 is checked', () => {
      // Arrange
      document.body.innerHTML = `<div id="successMessage"></div><input id="GAradio1" type="radio"><input id="GAradio2" type="radio" checked><button id="btnSaveCookies"></button>`;
      const cookies = require('../cookies-functions.js');

      // Act
      cookies.radioSetCookies();

      // Assert
      expect(document.getElementById('successMessage').style.display).toEqual('block');
    });
  });
});
