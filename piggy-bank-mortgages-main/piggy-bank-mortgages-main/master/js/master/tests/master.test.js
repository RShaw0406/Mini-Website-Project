jest.mock('../../auth/auth.js', () => {
  return { checkSignInStatus: jest.fn() };
});

document.body.innerHTML = `<button id="btnAcceptCookies"></button><button id="sign-in"></button><div id="cookieConsent"></div><div id="cookieOverlay"></div><button id="btnSaveCookies"></button>`;
beforeAll(() => {
  global.dataLayer.push = jest.fn();
});
afterEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

describe('Master tests', () => {
  describe('When setCookiesConsent is called', () => {
    it('should update the element styles correctly if cookies have been accepted', () => {
      // Arrange
      global.dataLayer = undefined;
      const mockCookie =
        '_xsrf=2|4575d7cc|b501c301b2f84248920a7242bc9d2775|1677600834; _PiggyBank_Cookie_Preference=_ga_G-QCX3G9KSPC=1,_ga=1; _ga=GA1.1.592491872.1679919115; _ga_QCX3G9KSPC=GS1.1.1680029219.6.0.1680030027.0.0.0';
      jest.spyOn(document, 'cookie', 'get').mockReturnValueOnce(mockCookie);
      const master = require('../master.js');
      // Act
      master.setCookiesConsent();
      // Assert
      expect(document.getElementById('cookieConsent').style.display).toEqual('none');
      expect(document.getElementById('cookieOverlay').style.display).toEqual('none');
    });
    it('should update the element styles correctly if cookies have not been accepted', () => {
      // Arrange
      const mockCookie =
        '_xsrf=2|4575d7cc|b501c301b2f84248920a7242bc9d2775|1677600834; _PiggyBank_Cookie_Preference=_ga_G-QCX3G9KSPC=0,_ga=0; _ga=GA1.1.592491872.1679919115; _ga_QCX3G9KSPC=GS1.1.1680029219.6.0.1680030027.0.0.0';
      jest.spyOn(document, 'cookie', 'get').mockReturnValueOnce(mockCookie);
      const master = require('../master.js');
      // Act
      master.setCookiesConsent();
      // Assert
      expect(document.getElementById('cookieConsent').style.display).toEqual('none');
      expect(document.getElementById('cookieOverlay').style.display).toEqual('none');
    });
    it('should update the element styles correctly if cookies have not been selected yet', () => {
      // Arrange
      const mockCookie = 'test';
      jest.spyOn(document, 'cookie', 'get').mockReturnValueOnce(mockCookie);
      const master = require('../master.js');
      // Act
      master.setCookiesConsent();
      // Assert
      expect(document.getElementById('cookieConsent').style.display).toEqual('block');
      expect(document.getElementById('cookieOverlay').style.display).toEqual('block');
    });
  });
  describe('When acceptCookies is called', () => {
    it('should update the element styles correctly', () => {
      // Arrange
      const master = require('../master.js');
      // Act
      master.acceptCookies();

      // Assert
      expect(document.getElementById('cookieConsent').style.display).toEqual('none');
      expect(document.getElementById('cookieOverlay').style.display).toEqual('none');
    });
  });
  describe('When webpage content loads and buttons are clicked', () => {
    it('should call the setCookiesConsent and acceptCookies functions', async () => {
      document.body.innerHTML += `<div id="successMessage"></div></div><input id="GAradio1" type="radio"><input id="GAradio2" type="radio">`;
      const mockSetCookiesConsent = jest.fn();
      const mockAcceptCookies = jest.fn();
      jest.mock('../master.js', () => {
        return {
          ...jest.requireActual('../master.js'),
          setCookiesConsent: mockSetCookiesConsent(),
          acceptCookies: mockAcceptCookies(),
        };
      });
      // Arrange
      await import('../master.js');
      // Act
      window.document.dispatchEvent(
        new Event('DOMContentLoaded', {
          bubbles: true,
          cancelable: true,
        }),
      );
      document.getElementById('btnAcceptCookies').click();

      // Assert
      expect(mockSetCookiesConsent).toBeCalled();
      expect(mockAcceptCookies).toBeCalled();
    });
  });
  describe('When sign-in is clicked', () => {
    it('should call the update window.location.href function', async () => {
      // Arrange
      const windowSpy = jest.spyOn(window, 'window', 'get');
      windowSpy.mockImplementation(() => ({
        location: {
          href: 'https://example.com',
        },
      }));

      require('../master.js');
      // Act
      document.getElementById('sign-in').click();

      // Assert
      expect(window.location.href).toEqual('https://example.com');
    });
  });
});
