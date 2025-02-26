import * as formValidation from '../../form-validation';
describe('Form Validation Tests', () => {
  describe('When validationHandler is called with a 0', () => {
    it('Should call the applicationValidation function and return true if either radios are checked', () => {
      // Arrange
      document.body.innerHTML =
        '<input type="radio" id="single-applicant" checked><input type="radio" id="partner-applicant">';
      const expectedResult = true;
      // Act
      const result = formValidation.validationHandler(0, 1);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should call the applicationValidation function and return false if both radios are unchecked', () => {
      // Arrange
      document.body.innerHTML = '<input type="radio" id="single-applicant"><input type="radio" id="partner-applicant">';
      const expectedResult = false;
      // Act
      const result = formValidation.validationHandler(0, 1);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('When validationHandler is called with a 1', () => {
    it('Should call the personalDetailsValidation function and return true if all inputs are filled in', () => {
      // Arrange
      document.body.innerHTML =
        '<input type="text" class="personal" value="test" required> <input type="text" class="personal" value="test2" required>';
      const expectedResult = true;
      // Act
      const result = formValidation.validationHandler(1, 1);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should call the personalDetailsValidation function and return false if any input is not filled in', () => {
      // Arrange
      document.body.innerHTML =
        '<input type="text" class="personal" value="test" required> <input type="text" class="personal" value="" required>';
      const expectedResult = false;
      // Act
      const result = formValidation.validationHandler(1, 1);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('When validationHandler is called with a 2', () => {
    it('Should call the mortgageTypeValidation function and return true if one radio is checked', () => {
      // Arrange
      document.body.innerHTML =
        '<input type="radio" id="first-home" checked><input type="radio" id="move-home"><input type="radio" id="another-property">';
      const expectedResult = true;
      // Act
      const result = formValidation.validationHandler(2, 1);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should call the mortgageTypeValidation function and return false if all radios are unchecked', () => {
      // Arrange
      document.body.innerHTML =
        '<input type="radio" id="first-home"><input type="radio" id="move-home"><input type="radio" id="another-property">';
      const expectedResult = false;
      // Act
      const result = formValidation.validationHandler(2, 1);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('When validationHandler is called with a 3', () => {
    it('Should call the employmentValidation function and return true if single radio is checked for each applicant', () => {
      // Arrange
      document.body.innerHTML =
        '<input type="radio" id="employed1" checked><input type="radio" id="unemployed1"><input type="radio" id="employed2" checked><input type="radio" id="unemployed2">';
      const expectedResult = true;
      // Act
      const result = formValidation.validationHandler(3, 2);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should call the employmentValidation function and return false if all radios are unchecked for each applicant', () => {
      // Arrange
      document.body.innerHTML =
        '<input type="radio" id="employed1"><input type="radio" id="unemployed1"><input type="radio" id="employed2"><input type="radio" id="unemployed2">';
      const expectedResult = false;
      // Act
      const result = formValidation.validationHandler(3, 2);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should call the employmentValidation function and return false if all radios are unchecked for applicant2 only', () => {
      // Arrange
      document.body.innerHTML =
        '<input type="radio" id="employed1" checked><input type="radio" id="unemployed1"><input type="radio" id="employed2"><input type="radio" id="unemployed2">';
      const expectedResult = false;
      // Act
      const result = formValidation.validationHandler(3, 2);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('When validationHandler is called with a 4', () => {
    it('Should call the incomeValidation function and return true if all inputs are filled in', () => {
      // Arrange
      document.body.innerHTML =
        '<input type="text" class="income" value="test" required> <input type="text" class="income" value="test2" required>';
      const expectedResult = true;
      // Act
      const result = formValidation.validationHandler(4, 1);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should call the incomeValidation function and return false if all inputs are not filled in', () => {
      // Arrange
      document.body.innerHTML =
        '<input type="text" class="income" value="test" required> <input type="text" class="income" value="" required>';
      const expectedResult = false;
      // Act
      const result = formValidation.validationHandler(4, 1);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('When validationHandler is called with a 5', () => {
    describe('When validationHandler is called with a 5', () => {
      it('Should call the outgoingsValidation function and return true if all inputs are filled in', () => {
        // Arrange
        document.body.innerHTML =
          '<input type="text" class="outgoings" value="10000" required> <input type="text" class="outgoings" value="12334" required>';
        const expectedResult = true;
        // Act
        const result = formValidation.validationHandler(5, 1);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
    it('Should call the outgoingsValidation function and return false if all inputs are not filled in', () => {
      // Arrange
      document.body.innerHTML =
        '<input type="text" class="outgoings" value="10000" required> <input type="text" class="outgoings" value="" required>';
      const expectedResult = false;
      // Act
      const result = formValidation.validationHandler(5, 1);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
