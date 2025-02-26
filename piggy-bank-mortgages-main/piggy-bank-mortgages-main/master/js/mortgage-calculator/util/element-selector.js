// Contains functions used to return specific elements on the page

export const getPreviousButton = () => {
  // Returns previous button element
  return document.querySelector('#prev-button');
};
export const getNextButton = () => {
  // Returns next button element
  return document.querySelector('#next-button');
};
export const getSubmitButton = () => {
  // Returns submit button element
  return document.querySelector('#submit-button');
};
export const getContactButton = () => {
  // Returns contact button element
  return document.querySelector('#contact-button');
};
export const getForm = () => {
  // Returns mortgage calculator form element
  return document.getElementById('mortgage-calculator-form');
};
export const getStepTargets = () => {
  // Returns list of all steps in the form
  return document.querySelectorAll('.step');
};
export const getStepPanels = () => {
  // Returns list of all panels in the form
  return document.querySelectorAll('.panel');
};
export const getFailMessage = () => {
  // Returns fail message form element
  return document.getElementById('failMessage');
};
