// Contains all validation functions used to ensure the relevant fields are populated/checked before moving on

export const validationHandler = (step, applicantNo) => {
  // Handles which validation function to call depending on the step
  switch (step) {
    case 0:
      return applicantValidation();
    case 1:
      return checkInputValidity('personal');
    case 2:
      return mortgageTypeValidation();
    case 3:
      return employmentValidation(applicantNo);
    case 4:
      return checkInputValidity('income');
    case 5:
      return checkInputValidity('outgoings');
  }
};

export const checkInputValidity = (className) => {
  // Checks whether all of the input fields with the given className are filled
  const inputDetails = document.getElementsByClassName(className);
  let result = true;
  for (let i = 0; i < inputDetails.length; i++) {
    if (inputDetails.item(i).checkValidity() === false) {
      return false;
    }
  }
  return result;
};

export const applicantValidation = () => {
  // Checks for whether either of the single applicant or partner applicant radio buttons are checked
  return document.getElementById('single-applicant').checked || document.getElementById('partner-applicant').checked;
};

export const mortgageTypeValidation = () => {
  // Checks for whether any of the mortgage type radio buttons are checked
  if (
    document.getElementById('first-home').checked ||
    document.getElementById('move-home').checked ||
    document.getElementById('another-property').checked
  ) {
    return true;
  } else return false;
};

export const employmentValidation = (applicantNo) => {
  // Checks for whether either of the employment radio buttons are checked for each applicant
  let result = false;
  for (let i = 1; i <= applicantNo; i++) {
    result = document.getElementById(`employed${i}`).checked || document.getElementById(`unemployed${i}`).checked;
  }
  return result;
};
