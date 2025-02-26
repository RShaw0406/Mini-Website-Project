document.body.innerHTML = `<button id="sign-in"></button><button id="sign-out"></button>`;

const windowSpy = jest.spyOn(window, 'window', 'get');
windowSpy.mockImplementation(() => ({
  location: {
    href: 'https://test.com',
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('Auth tests', () => {
  describe('When validateUser is called', () => {
    it('should return true when called with the correct credentials', () => {
      // arrange
      const auth = require('../auth.js');
      // act
      const result = auth.validateUser('admin@piggybankmortgages.com', 'testPassword@123');
      // assert
      expect(result).toEqual(true);
    });
    it('should return false when called with the wrong credentials', () => {
      // arrange
      const auth = require('../auth.js');
      // act
      const result = auth.validateUser('test@test.com', 'wrongpassword@123');
      // assert
      expect(result).toEqual(false);
    });
  });
  describe('When clearLoginCreds is called', () => {
    it('should call setItem and set signedIn to false', () => {
      // arrange
      const auth = require('../auth.js');
      sessionStorage.setItem('signedIn', 'true')
      // act
      auth.clearLoginCreds();
      // assert
      expect(windowSpy.mock.results[0].value.location.href).toEqual('../html/Home.html');
      expect(sessionStorage.getItem('signedIn')).toEqual('false')
    });
  });
  describe('When checkSignInStatus is called', () => {
    it('should call add the correct classes if the user is signed in', () => {
      // arrange
      const auth = require('../auth.js');
      sessionStorage.setItem('signedIn', 'true')
      // act
      auth.checkSignInStatus();
      // assert
      expect([...document.getElementById('sign-in').classList]).toEqual(['d-none']);
      expect([...document.getElementById('sign-out').classList]).toEqual([]);
    });
    it('should call add the correct classes if the user is signed out', () => {
      // arrange
      const auth = require('../auth.js');
      sessionStorage.setItem('signedIn', 'false')
      // act
      auth.checkSignInStatus();
      // assert
      expect([...document.getElementById('sign-in').classList]).toEqual([]);
      expect([...document.getElementById('sign-out').classList]).toEqual(['d-none']);
    });
  });
});
