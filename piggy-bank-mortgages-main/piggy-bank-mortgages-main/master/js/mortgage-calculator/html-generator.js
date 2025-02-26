// Contains functionality that is used to render the correct HTMl sections

export const renderHtml = (section, applicantNo, applicant1Employed, applicant2Employed) => {
  // Handles which html rendering function to call depending on the section
  switch (section) {
    case 1:
      document.getElementById('personal-details').innerHTML = getPersonalDetails(applicantNo);
      break;
    case 3:
      document.getElementById('employment').innerHTML = getEmploymentDetails(applicantNo);
      break;
    case 4:
      document.getElementById('income').innerHTML = getIncomeDetails(
        applicantNo,
        applicant1Employed,
        applicant2Employed,
      );
      break;
    case 5:
      document.getElementById('outgoings').innerHTML = getOutgoingsDetails(applicantNo);
      break;
  }
};

const getPersonalDetails = (count) => {
  // Returns the personalDetails html section for each applicant
  let result = ``;
  for (let i = 1; i <= count; i++) {
    result += `<h4>Applicant ${i}:</h4>
        <div class="row pt-2">
        <div class="form-check form-check-inline">
            <label class="required" for="exampleInputName1">First name</label>
            <div class="col-sm-8 pt-1">
                <input type="text" class="form-control personal" placeholder="Enter first name"
                    name="firstname${i}" required>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="form-check form-check-inline">
            <label class="required" for="exampleInputName2">Surname</label>
            <div class="col-sm-8 pt-1">
                <input type="text" class="form-control personal" name="surname${i}"
                    placeholder="Enter surname" required>

            </div>
        </div>
    </div>
    <div class="row">
        <div class="form-check form-check-inline">
            <label class="required" for="exampleInputEmail">Email</label>
            <div class="col-sm-8 pt-1">
                <input type="email" class="form-control personal" name="email${i}"
                    placeholder="Enter email address" required>

            </div>
        </div>
    </div>
    <div class="row">
        <div class="form-check form-check-inline">
            <label class="required" for="exampleInputEmail">Phone number</label>
            <div class="col-sm-8 pt-1">
                <input type="number" class="form-control"
                                    placeholder="Enter mobile number(preferred)" name="phone" required>
            </div>
        </div>
    </div>
    </br>
    `;
  }
  return result;
};

const getEmploymentDetails = (count) => {
  // Returns the employmentDetails html section for each applicant
  let result = ``;
  for (let i = 1; i <= count; i++) {
    result += `<h4>Applicant ${i}:</h4>
        <div class="row">
        <h7 class="required">Are you employed?</h7>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="employed${i}" id="employed${i}" required>
        <label class="form-check-label" for="employed${i}">
            Yes
        </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="employed${i}" id="unemployed${i}" required>
        <label class="form-check-label" for="unemployed${i}">
            No
        </label>
        </div>
        </br>
        `;
  }
  return result;
};

const reducedIncomeHtml = `<div class="row pt-2">
                            <div class="form-check form-check-inline">
                                <label class="required">How much do you earn each year, before tax?</label>
                                <br>
                                <div class="col-sm-8 pt-1">
                                    <p><small>This is the gross pay you receive, including benefits</small>
                                    </p>
                                    <input type="number" class="form-control income" name="yearly-salary" min="1" step="any" required>
                                </div>
                            </div>
                        </div>
                         </br>
                        `;

const employedIncomeHtml = `<div class="row pt-2">
                            <div class="form-check form-check-inline">
                                <label class="required">How much do you earn each year, before tax?</label>
                                <br>
                                <div class="col-sm-8 pt-1">
                                    <p><small>This is your gross yearly salary you receive from your employer</small>
                                    </p>
                                    <input type="number" class="form-control income" name="yearly-salary" min="1" step="any" required>
                                </div>
                            </div>
                        </div>
                        <div class="row pt-2">
                            <div class="form-check form-check-inline">
                                <label class="required">How much in bonuses do you receive per year, before tax?</label>
                                <br>
                                <div class="col-sm-8 pt-1">
                                    <p><small>This is the total amount you receive as a bonus from your employer</small>
                                    </p>
                                    <input type="number" class="form-control income" name="bonus" step="any" required>
                                </div>
                            </div>
                        </div>
                        <div class="row pt-2">
                            <div class="form-check form-check-inline">
                                <label class="required">Are you paid anything else? if so tell us how much</label>
                                <br>
                                <div class="col-sm-8 pt-1">
                                    <p><small>This is any additional income you receive</small></p>
                                    <input type="number" class="form-control income" name="other" step="any" required>
                                </div>
                            </div>
                        </div>
                         </br>
                        `;

const getIncomeDetails = (count, applicant1Employed, applicant2Employed) => {
  // Returns the incomeDetails html section depending on whether each applicant is employed
  let result = ``;
  for (let i = 1; i <= count; i++) {
    result += `<h4>Applicant ${i}:</h4>`;
    if (i === 1) {
      if (applicant1Employed === true) {
        result += employedIncomeHtml;
      } else {
        result += reducedIncomeHtml;
      }
    } else {
      if (applicant2Employed === true) {
        result += employedIncomeHtml;
      } else {
        result += reducedIncomeHtml;
      }
    }
  }
  return result;
};

const getOutgoingsDetails = (count) => {
  // Returns the outgoingsDetails html section for each applicant
  let result = ``;
  for (let i = 1; i <= count; i++) {
    result += `<h4>Applicant ${i}:</h4>
                    <div class="row pt-2">
                    <div class="form-check form-check-inline">
                        <label class="required">How much are you paying off in credit cards?</label>
                        <br>
                        <div class="col-sm-8 pt-1">
                            <p><small>This is the total balance you currently hold on all credit cards</small>
                            </p>
                            <input type="number" class="form-control outgoings" name="credit-debt" step="any" required>
                        </div>
                    </div>
                </div>
                <div class="row pt-2">
                    <div class="form-check form-check-inline">
                        <label class="required" for="exampleInputName1">How much are you paying off in loans?</label>
                        <br>
                        <div class="col-sm-8 pt-1">
                            <p><small>This is for any outstanding loans e.g. car finance</small></p>
                            <input type="number" class="form-control outgoings" name="loan-debt" step="any" required>
                        </div>
                    </div>
                </div>
                <div class="row pt-2">
                    <div class="form-check form-check-inline">
                        <label class="required" for="exampleInputName1">How much in other expenses are you paying?</label>
                        <br>
                        <div class="col-sm-8 pt-1">
                            <p><small>This could be for household bills such as electricity or gas</small></p>
                            <input type="number" class="form-control outgoings" name="other-debt" step="any" required>
                        </div>
                    </div>
                </div>
                </br>
                `;
  }
  return result;
};

const formatter = new Intl.NumberFormat('en-UK', {
  // Used to format number values into UK currency
  style: 'currency',
  currency: 'GBP',
});

export const getResults = (amount) => {
  // Returns the results html section containing the mortgage amount that can be borrowed
  if (amount > 0) {
    return `<div class="d-flex justify-content-center">
                    <div class="row pt-2">
                        <h3>Good news! you can borrow up to</h3>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <div class="row pt-2">
                        <h3>${formatter.format(amount)}</h3>
                    </div>
                </div>
        `;
  } else {
    return `<div class="d-flex justify-content-center">
                    <div class="row pt-2" align="center">
                        <h3>Sorry, we are unable to provide you with a mortgage based on the details you have provided</h3>
                    </div>
                </div>
        `;
  }
};

export const displayFailureMessage = (failMessage, form) => {
  failMessage.classList.remove('d-none');
  form.classList.add('was-validated');
}

