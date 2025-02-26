document.body.innerHTML = `<button id="buttonSignIn"></button><button id="failSignIn"></button> <input id="emailInput" value="test@test.com"><input id="passwordInput" value="testPassword">`;
const buttonSignIn = document.getElementById('buttonSignIn');
const failSignIn = document.getElementById('failSignIn');
sessionStorage.setItem('signedIn', 'false');
const windowSpy = jest.spyOn(window, 'window', 'get');
windowSpy.mockImplementation(() => ({
  location: {
    href: 'https://test.com',
  },
}));

afterEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});
describe('Sign in tests', () => {
  describe('When sign in button is clicked', () => {
    it('should update the element styles correctly if validated returns true', () => {
      // Arrange
      jest.mock('../../auth/auth.js', () => {
        return {
          validateUser: jest.fn().mockReturnValue(true),
        };
      });
      // Act
      require('../sign-in');

      buttonSignIn.click();
      // Assert
      expect(failSignIn.style.display).toEqual('none');
      expect(sessionStorage.getItem('signedIn')).toEqual('true');
    });
    it('should update the element styles correctly if validated returns false', () => {
      // Arrange
      jest.mock('../../auth/auth.js', () => {
        return {
          validateUser: jest.fn().mockReturnValue(false),
        };
      });
      // Act
      require('../sign-in');

      buttonSignIn.click();
      // Assert
      expect(failSignIn.style.display).toEqual('block');
      expect(sessionStorage.getItem('signedIn')).toEqual('false');
    });
  });
});
