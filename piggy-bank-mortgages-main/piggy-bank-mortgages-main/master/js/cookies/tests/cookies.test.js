beforeEach(() => {
    document.body.innerHTML = `<div id="successMessage"></div><input id="GAradio1" type="radio"><input id="GAradio2" type="radio"><button id="btnSaveCookies"></button>`;
});

afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
});

describe('Cookies tests', () => {
  describe('Web content loads', () => {
    it('should call getCookiesSettings', () => {
      // Arrange
      const mockGetCookiesSettings = jest.fn();
      jest.mock('../cookies.js', () => ({
        ...jest.requireActual('../cookies.js'),
        getCookiesSettings: mockGetCookiesSettings(),
      }));
      // Act
      require('../cookies.js');
      window.document.dispatchEvent(
        new Event('DOMContentLoaded', {
          bubbles: true,
          cancelable: true,
        }),
      );

      // Assert
      expect(mockGetCookiesSettings).toBeCalled();
    });
  });
  describe('btnSaveCookies is clicked', () => {
    it('should call radioSetCookies', () => {
      // Arrange
      const mockRadioSetCookies = jest.fn();
      jest.mock('../cookies.js', () => ({
        ...jest.requireActual('../cookies.js'),
        radioSetCookies: mockRadioSetCookies(),
      }));
      // Act
      require('../cookies.js');
      document.getElementById('btnSaveCookies').click();

      // Assert
      expect(mockRadioSetCookies).toBeCalled();
    });
  });
});
