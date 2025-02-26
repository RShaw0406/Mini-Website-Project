import {
  checkEmploymentStatus,
  getFormData,
  getNextForm,
  getPrevForm,
  updateDisplayStatus
} from '../../util/form-functions';

const previousButton = document.createElement('button');
const nextButton = document.createElement('button');
const submitButton = document.createElement('button');
const contactButton = document.createElement('button');
const form = document.createElement('form')
const failMessage = document.createElement('fail-message')

describe('Form Functions Tests', () => {
  describe('When updateDisplayStatus is called', () => {
    it('Should add/remove the correct classLists when currentStep = 0', () => {
      // Arrange
      const expectedPreviousButtonValues = ['d-none'];
      const expectedContactButtonValues = ['d-none'];
      const expectedSubmitButtonValues = ['d-none'];
      // Act
      updateDisplayStatus(0, 'test', previousButton, nextButton, submitButton, contactButton);
      // Assert
      expect([...previousButton.classList.values()]).toEqual(expectedPreviousButtonValues);
      expect([...contactButton.classList.values()]).toEqual(expectedContactButtonValues);
      expect([...submitButton.classList.values()]).toEqual(expectedSubmitButtonValues);
      expect([...nextButton.classList.values()]).toEqual([]);
    });
    it('Should add/remove the correct classLists when currentStep = 1', () => {
      // Arrange
      const expectedContactButtonValues = ['d-none'];
      const expectedSubmitButtonValues = ['d-none'];
      // Act
      updateDisplayStatus(1, 'test', previousButton, nextButton, submitButton, contactButton);
      // Assert
      expect([...previousButton.classList.values()]).toEqual([]);
      expect([...nextButton.classList.values()]).toEqual([]);
      expect([...contactButton.classList.values()]).toEqual(expectedContactButtonValues);
      expect([...submitButton.classList.values()]).toEqual(expectedSubmitButtonValues);
    });
    it('Should add/remove the correct classLists when 2nd last currentStep ', () => {
      // Arrange
      const expectedContactButtonValues = ['d-none'];
      const expectedNextButtonValues = ['d-none'];
      // Act
      updateDisplayStatus(2, 'test', previousButton, nextButton, submitButton, contactButton);
      // Assert
      expect([...submitButton.classList.values()]).toEqual([]);
      expect([...nextButton.classList.values()]).toEqual(expectedNextButtonValues);
      expect([...contactButton.classList.values()]).toEqual(expectedContactButtonValues);
    });
    it('Should add/remove the correct classLists when on last currentStep ', () => {
      // Arrange
      const expectedSubmitButtonValues = ['d-none'];
      // Act
      updateDisplayStatus(3, 'test', previousButton, nextButton, submitButton, contactButton);
      // Assert
      expect([...submitButton.classList.values()]).toEqual(expectedSubmitButtonValues);
      expect([...contactButton.classList.values()]).toEqual([]);
    });
  });
  describe('When getFormData is called', () => {
    it('Should return the data in the correct format', () => {
      // Arrange
      const form = document.createElement('form');
      form.innerHTML = '<form><input type="text" name="testInput" value="test"</input></form>';
      const event = { target: form };
      const expectedResult = [['testInput', 'test']];
      // Act
      const result = getFormData(event);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('When checkEmploymentStatus is called', () => {
    it('Should return the correct object with employment data for a single employed applicant', () => {
      // Arrange
      document.body.innerHTML = '<input type="radio" id="employed1" checked>';
      const expectedResult = { applicant1: true, applicant2: false };
      // Act
      const result = checkEmploymentStatus(1, false, false);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should return the correct object with employment data for a single unemployed applicant', () => {
      // Arrange
      document.body.innerHTML = '<input type="radio" id="employed1">';
      const expectedResult = { applicant1: false, applicant2: false };
      // Act
      const result = checkEmploymentStatus(1, false, false);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should return the correct object with employment data for two employed applicants', () => {
      // Arrange
      document.body.innerHTML =
        '<input type="radio" id="employed1" checked><input type="radio" id="employed2" checked>';
      const expectedResult = { applicant1: true, applicant2: true };
      // Act
      const result = checkEmploymentStatus(2, false, false);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should return the correct object with employment data for two unemployed applicants', () => {
      // Arrange
      document.body.innerHTML = '<input type="radio" id="employed1"><input type="radio" id="employed2">';
      const expectedResult = { applicant1: false, applicant2: false };
      // Act
      const result = checkEmploymentStatus(2, false, false);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should return the correct object with employment data for when applicant1 is employed and applicant2 is unemployed', () => {
      // Arrange
      document.body.innerHTML = '<input type="radio" id="employed1" checked><input type="radio" id="employed2">';
      const expectedResult = { applicant1: true, applicant2: false };
      // Act
      const result = checkEmploymentStatus(2, false, false);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should return the correct object with employment data for when applicant1 is unemployed and applicant2 is employed', () => {
      // Arrange
      document.body.innerHTML = '<input type="radio" id="employed1"><input type="radio" id="employed2" checked>';
      const expectedResult = { applicant1: false, applicant2: true };
      // Act
      const result = checkEmploymentStatus(2, false, false);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('When getPrevForm is called', () => {
    const stepPanels = [
      document.createElement('panel1'),
      document.createElement('panel2'),
      document.createElement('panel3'),
    ];
    const stepTargets = [
      document.createElement('target1'),
      document.createElement('target2'),
      document.createElement('target3'),
    ];
    it('should add/remove the correct classLists when currentStep = 1 and return the previous step', () => {
      // Act
      const result = getPrevForm(stepPanels, stepTargets, 1, failMessage, form);
      // Assert
      expect([...stepPanels[1].classList.values()]).toEqual(['d-none']);
      expect([...stepTargets[1].classList.values()]).toEqual([]);
      expect([...stepPanels[0].classList.values()]).toEqual([]);
      expect([...stepTargets[0].classList.values()]).toEqual(['active']);
      expect(result).toEqual(0)
    });
  });
  describe('When getNextForm is called', () => {
    const stepPanels = [
      document.createElement('panel1'),
      document.createElement('panel2'),
      document.createElement('panel3'),
    ];
    const stepTargets = [
      document.createElement('target1'),
      document.createElement('target2'),
      document.createElement('target3'),
    ];
    it('should add/remove the correct classLists when currentStep = 1 and return the next step', () => {
      // Act
      const result = getNextForm(stepPanels, stepTargets, 1, failMessage, form);
      // Assert
      expect([...stepPanels[1].classList.values()]).toEqual(['d-none']);
      expect([...stepTargets[1].classList.values()]).toEqual([]);
      expect([...stepPanels[2].classList.values()]).toEqual([]);
      expect([...stepTargets[2].classList.values()]).toEqual(['active']);
      expect(result).toEqual(2)
    });
  });
});
