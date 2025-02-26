// Handles all form eventListeners and calls out to the relevant functions to perform html generation, form validation, mortgage calculations
import { displayFailureMessage, getResults, renderHtml } from './html-generator.js';
import { validationHandler } from './form-validation.js';
import { calculateBorrowAmount } from './mortgage-calculator.js';
import {
  getContactButton,
  getFailMessage,
  getForm,
  getNextButton,
  getPreviousButton,
  getStepPanels,
  getStepTargets,
  getSubmitButton,
} from './util/element-selector.js';
import {
  checkEmploymentStatus,
  getFormData,
  getNextForm,
  getPrevForm,
  updateDisplayStatus,
} from './util/form-functions.js';

const previousButton = getPreviousButton();
const nextButton = getNextButton();
const submitButton = getSubmitButton();
const contactButton = getContactButton();
const mortgageCalculatorForm = getForm();
const stepTargets = getStepTargets();
const stepPanels = getStepPanels();
const failMessage = getFailMessage();
let currentStep = 0;
let applicantNo = 0;
let applicant1Employed,
  applicant2Employed = false;

nextButton.addEventListener('click', (e) => {
  e.preventDefault();
  let validated = validationHandler(currentStep, applicantNo);
  if (currentStep === 0) {
    if (document.getElementById('partner-applicant').checked) {
      applicantNo = 2;
    } else applicantNo = 1;
  }
  if (validated === true) {
    if (currentStep === 3) {
      const employmentResult = checkEmploymentStatus(applicantNo, applicant1Employed, applicant2Employed);
      applicant1Employed = employmentResult.applicant1;
      applicant2Employed = employmentResult.applicant2;
    }
    currentStep = getNextForm(stepPanels, stepTargets, currentStep, failMessage, mortgageCalculatorForm);
    updateDisplayStatus(currentStep, stepTargets, previousButton, nextButton, submitButton, contactButton);
    renderHtml(currentStep, applicantNo, applicant1Employed, applicant2Employed);
  } else {
    displayFailureMessage(failMessage, mortgageCalculatorForm);
  }
});

previousButton.addEventListener('click', (e) => {
  e.preventDefault();
  currentStep = getPrevForm(stepPanels, stepTargets, currentStep, failMessage, mortgageCalculatorForm);
  updateDisplayStatus(currentStep, stepTargets, previousButton, nextButton, submitButton, contactButton);
});

contactButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '../html/Contact.html';
});

mortgageCalculatorForm.addEventListener(
  'submit',
  (e) => {
    e.preventDefault();
    if (!mortgageCalculatorForm.checkValidity()) {
      e.stopPropagation();
      displayFailureMessage(failMessage, mortgageCalculatorForm);
    } else {
      const formData = getFormData(e);
      const borrowAmount = calculateBorrowAmount(formData, applicantNo, applicant1Employed, applicant2Employed);
      currentStep = getNextForm(stepPanels, stepTargets, currentStep, failMessage, mortgageCalculatorForm);
      updateDisplayStatus(currentStep, stepTargets, previousButton, nextButton, submitButton, contactButton);
      const result = document.getElementById('result');
      result.innerHTML = getResults(borrowAmount);
    }
  },
  false,
);
