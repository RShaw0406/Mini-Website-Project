// Contains all functions that are used in the form handler
export function updateDisplayStatus(currentStep, stepTargets, previousButton, nextButton, submitButton, contactButton) {
  // Hides/Displays the relevant buttons based on the currentStep in the form
  if (currentStep === stepTargets.length - 2) {
    submitButton.classList.remove('d-none');
    nextButton.classList.add('d-none');
    contactButton.classList.add('d-none');
  } else if (currentStep === stepTargets.length - 1) {
    submitButton.classList.add('d-none');
    contactButton.classList.remove('d-none');
  } else if (currentStep === 0) {
    nextButton.classList.remove('d-none');
    previousButton.classList.add('d-none');
    submitButton.classList.add('d-none');
    contactButton.classList.add('d-none');
  } else {
    nextButton.classList.remove('d-none');
    previousButton.classList.remove('d-none');
    submitButton.classList.add('d-none');
    contactButton.classList.add('d-none');
  }
}

export const getFormData = (e) => {
  // Takes all provided form data and returns each entry in a list
  const data = new FormData(e.target);
  return [...data.entries()];
};

export const checkEmploymentStatus = (applicantNo, applicant1Employed, applicant2Employed) => {
  // Checks whether the employment radio buttons are checked depending on the amount of applicants
  applicant1Employed = document.getElementById(`employed1`).checked;
  if (applicantNo === 2) {
    applicant2Employed = document.getElementById(`employed2`).checked;
  }
  return { applicant1: applicant1Employed, applicant2: applicant2Employed };
};

export const getPrevForm = (stepPanels, stepTargets, currentStep, failMessage, form) => {
  // Hides/Displays the relevant elements based on the currentStep in th form to return the previous form
  failMessage.classList.add('d-none');
  form.classList.remove('was-validated');
  stepPanels[currentStep].classList.add('d-none');
  stepTargets[currentStep].classList.remove('active');

  stepPanels[currentStep - 1].classList.remove('d-none');
  stepTargets[currentStep - 1].classList.add('active');
  return currentStep - 1;
};

export const getNextForm = (stepPanels, stepTargets, currentStep, failMessage, form) => {
  // Hides/Displays the relevant elements based on the currentStep in th form to return the next form
  failMessage.classList.add('d-none');
  form.classList.remove('was-validated');
  stepPanels[currentStep].classList.add('d-none');
  stepTargets[currentStep].classList.remove('active');

  stepPanels[currentStep + 1].classList.remove('d-none');
  stepTargets[currentStep + 1].classList.add('active');
  return currentStep + 1;
};
