import { calculateBorrowAmount, calculateMonthlyAmount, parseEntries } from '../../mortgage-calculator';
import {
  partner1EmployedPartner2UnemployedApplicantList,
  partner1UnemployedPartner2EmployedApplicantList,
  partnerBothEmployedApplicantList,
  partnerBothUnemployedApplicantList,
  singleEmployedApplicantList,
  singleUnemployedApplicantList,
} from './util/formEntries';

describe('Mortgage Calculator Tests', () => {
  describe('When calling parseEntries with a list of data', () => {
    it('Should return the correct data object with key/value pairs', () => {
      // Arrange
      const originalDataList = [
        ['key1', 'value1'],
        ['key2', 'value2'],
        ['key3', 'value3'],
      ];
      const expectedDataObject = [
        { key: 'key1', value: 'value1' },
        { key: 'key2', value: 'value2' },
        { key: 'key3', value: 'value3' },
      ];
      // Act
      const result = parseEntries(originalDataList);
      // Assert
      expect(result).toEqual(expectedDataObject);
    });
  });
  describe('When calling calculateBorrowAmount', () => {
    it('Should return the correct borrow amount for a single employed applicant', () => {
      // Arrange
      const formEntries = singleEmployedApplicantList;
      const expectedResult = 90790;
      // Act
      const result = calculateBorrowAmount(formEntries, 1, true, false);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should return 0 when a single unemployed applicant has a DTI ratio of greater than 0.43', () => {
      // Arrange
      const formEntries = singleUnemployedApplicantList;
      const expectedResult = 0;

      // Act
      const result = calculateBorrowAmount(formEntries, 1, false, false);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should return the correct borrow amount for a partner applicants who are both employed', () => {
      // Arrange
      const formEntries = partnerBothEmployedApplicantList;
      const expectedResult = 181580;

      // Act
      const result = calculateBorrowAmount(formEntries, 2, true, true);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should return the correct borrow amount for a partner applicants when both are unemployed', () => {
      // Arrange
      const formEntries = partnerBothUnemployedApplicantList;
      const expectedResult = 0;

      // Act
      const result = calculateBorrowAmount(formEntries, 2, false, false);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should return the correct borrow amount for a partner applicants when partner1 is employed and partner2 is unemployed', () => {
      // Arrange
      const formEntries = partner1EmployedPartner2UnemployedApplicantList;
      const expectedResult = 126580;

      // Act
      const result = calculateBorrowAmount(formEntries, 2, true, false);
      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should return the correct borrow amount for a partner applicants when partner1 is unemployed and partner2 is employed', () => {
      // Arrange
      const formEntries = partner1UnemployedPartner2EmployedApplicantList;
      const expectedResult = 126580;

      // Act
      const result = calculateBorrowAmount(formEntries, 2, false, true);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('When calling calculateMonthlyAmount with a list of objects containing number values', () => {
    it('Should return the correct total of each element', () => {
      // Arrange
      const amountList = [
        { key: 'key1', value: '1000' },
        { key: 'key2', value: '2000' },
        { key: 'key3', value: '3000' },
      ];
      const expectedAmount = 6000;
      // Act
      const result = calculateMonthlyAmount(amountList);
      // Assert
      expect(result).toEqual(expectedAmount);
    });
  });
});
