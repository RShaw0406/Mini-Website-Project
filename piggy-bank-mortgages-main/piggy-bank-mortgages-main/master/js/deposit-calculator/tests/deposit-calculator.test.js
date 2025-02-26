import * as fs from 'fs';

document.body.innerHTML = fs.readFileSync(`${__dirname}/resources/test.html`, 'utf-8');
const btnOpenModalDepositAmountInfo = document.getElementById('btnOpenModalDepositAmountInfo');
const modalDepositInfo = document.getElementById('modalDepositInfo');
const headerDepositAmountInfo = document.getElementById('headerDepositAmountInfo');
const headerDepositTimeInfo = document.getElementById('headerDepositTimeInfo');
const divDepositAmountInfo = document.getElementById('divDepositAmountInfo');
const divDepositTimeInfo = document.getElementById('divDepositTimeInfo');
const closeModalDepositInfo = document.getElementsByClassName('close')[0];
const finishedDepositInfo = document.getElementById('finishedDepositInfo');



describe('Deposit Calculator tests', () => {
  describe('When calculateDeposit is called', () => {
    it('should update the html correctly', () => {
      // Arrange
      let depositAmountRangeInput = document.getElementById('depositAmountRangeInput');
      depositAmountRangeInput.value = 50000
      let depositTimeRangeInput = document.getElementById('depositTimeRangeInput');
      depositTimeRangeInput.value = 20
      const depositCalculator = require('../deposit-calculator.js');

      // Act
      depositCalculator.calculateDeposit(depositAmountRangeInput, depositTimeRangeInput)
      // Assert
      expect(document.body.innerHTML).toMatchSnapshot()
    });
  });
  describe('When btnOpenModalDepositAmountInfo is clicked', () => {
    it('should update the element styles correctly', () => {
      // Arrange
      require('../deposit-calculator.js');
      // Act
      btnOpenModalDepositAmountInfo.click();
      // Assert
      expect(modalDepositInfo.style.display).toEqual('block')
      expect(headerDepositAmountInfo.style.display).toEqual('block')
      expect(headerDepositTimeInfo.style.display).toEqual('none')
      expect(divDepositAmountInfo.style.display).toEqual('block')
      expect(divDepositTimeInfo.style.display).toEqual('none')
    });
  });
  describe('When btnOpenModalDepositTimeInfo is clicked', () => {
    it('should update the element styles correctly', () => {
      // Arrange
      require('../deposit-calculator.js');
      // Act
      btnOpenModalDepositTimeInfo.click();
      // Assert
      expect(modalDepositInfo.style.display).toEqual('block')
      expect(headerDepositAmountInfo.style.display).toEqual('none')
      expect(headerDepositTimeInfo.style.display).toEqual('block')
      expect(divDepositAmountInfo.style.display).toEqual('none')
      expect(divDepositTimeInfo.style.display).toEqual('block')
    });
  });
  describe('When finishedDepositInfo is clicked', () => {
    it('should update the element styles correctly', () => {
      // Arrange
      require('../deposit-calculator.js');
      // Act
      finishedDepositInfo.click();
      // Assert
      expect(modalDepositInfo.style.display).toEqual('none')
    });
  });
  describe('When a value is input into depositAmountRangeInput', () => {
    it('should update the html correctly', () => {
      // Arrange
      const depositAmountRangeInput = document.getElementById('depositAmountRangeInput');
      require('../deposit-calculator.js');
      const event = {target: {value: "test"}}
      // Act
      depositAmountRangeInput.oninput(event)
      // Assert
      expect(document.body.innerHTML).toMatchSnapshot()
    });
  });
  describe('When a value is input into depositTimeRangeInput', () => {
    it('should update the html correctly', () => {
      // Arrange
      const depositTimeRangeInput = document.getElementById('depositTimeRangeInput');
      require('../deposit-calculator.js');
      const event = {target: {value: "test"}}
      // Act
      depositTimeRangeInput.oninput(event)
      // Assert
      expect(document.body.innerHTML).toMatchSnapshot()
    });
  });
  describe('When the window is clicked', () => {
    it('should update the element styles correclty if event target is modalDepositInfo', () => {
      // Arrange
      const event = {target: modalDepositInfo}
      require('../deposit-calculator.js');
      // Act
      document.defaultView.onclick(event)
      // Assert
      expect(modalDepositInfo.style.display).toEqual('none')
    });
  });
});
