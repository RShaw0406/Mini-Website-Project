
afterEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});
describe('Contact tests', () => {
  describe('When sendForm is called', () => {
    it('should update the element styles correctly if invalid', () => {
      // Arrange
      document.body.innerHTML = `<form id="contactForm"> <input type="text" name="test" id="test" required></form><div id="successMessage"></div><div id="failMessage"></div><button id="submit"></button>`;
      const contact = require('../contact.js');
      // Act
      contact.sendForm();
      // Assert
      expect(document.getElementById('failMessage').style.display).toEqual('block');
      expect(document.getElementById('successMessage').style.display).toEqual('none');
      expect([...document.getElementById('contactForm').classList]).toEqual(['was-validated']);
    });
    it('should update the element styles correctly if valid', () => {
      // Arrange
      document.body.innerHTML = `<form id="contactForm"> <input type="text" name="test" id="test" value="test value" required></form><div id="successMessage"></div><div id="failMessage"></div><button id="submit"></button>`;
      const contact = require('../contact.js');
      // Act
      contact.sendForm();
      // Assert
      expect(document.getElementById('failMessage').style.display).toEqual('none');
      expect(document.getElementById('successMessage').style.display).toEqual('block');
      expect([...document.getElementById('contactForm').classList]).toEqual(['was-validated']);
    });
  });
  describe('Wen initMap is called', () => {
    it('should create a new google map correctly', () => {
      // Arrange
      document.body.innerHTML = `<div id="map"></div><button id="submit"></button>`;
      const markerMock = jest.fn();
      const mapMock = jest.fn().mockImplementation(() => {
        return {mapMock: 'mapMock'};
      });
      const sizeMock = jest.fn().mockImplementation(() => {
        return {sizeMock: 'sizeMock'};
      });
      global.google = {
        maps: {Marker: markerMock, Map: mapMock, Size: sizeMock},
      };
      const belfastCoords = { lat: 54.59655203268345, lng: -5.930042286394907 };
      const contact = require('../contact.js');
      // Act
      contact.initMap();
      // Assert
      expect(mapMock).toBeCalledWith(document.getElementById('map'), {
        zoom: 15,
        center: belfastCoords,
      });
      expect(sizeMock).toHaveBeenNthCalledWith(1, 30, 40);
      expect(sizeMock).toHaveBeenNthCalledWith(2, 30, 40);
      expect(markerMock).toBeCalledWith({
        position: belfastCoords,
        map: {mapMock: 'mapMock'},
        optimized: false,
        url: 'path/img/marker@2x.png',
        size: {sizeMock: 'sizeMock'},
        scaledSize: {sizeMock: 'sizeMock'},
      });
    });
  });
  describe('When the page loads', () => {
    it('should call initMap', () => {
      // Arrange
      const mockInitMap = jest.fn();
      jest.mock('../contact', () => ({initMap: mockInitMap()}));
      document.body.innerHTML = `<form id="contactForm"> <input type="text" name="test" id="test" value="test value" required></form><div id="successMessage"></div><div id="failMessage"></div><button id="submit"></button>`;
      require('../contact.js');
      // Act
      window.document.dispatchEvent(new Event("DOMContentLoaded", {
        bubbles: true,
        cancelable: true
      }));
      // Assert
      expect(mockInitMap).toBeCalled;
    });
  });
  describe('When submit is clicked', () => {
    it('should call sendForm', () => {
      // Arrange
      const mockSendForm = jest.fn();
      document.body.innerHTML = `<form id="contactForm"> <input type="text" name="test" id="test" value="test value" required></form><div id="successMessage"></div><div id="failMessage"></div><button id="submit"></button>`;
      jest.mock('../contact.js', () => ({
        ...jest.requireActual('../contact.js'),
        sendForm: mockSendForm(),
      }));
      // Act
      require('../contact.js');
      document.getElementById('submit').click();
      // Assert
      expect(mockSendForm).toBeCalled;
    });
  });
});
