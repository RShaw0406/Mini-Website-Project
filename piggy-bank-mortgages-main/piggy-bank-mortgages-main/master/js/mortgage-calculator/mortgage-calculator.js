// Contains functions relating to calculating the total amount an applicant can borrow

export const parseEntries = (dataList) => {
  // Parses each entry in the data list and returns it in an object
  let dataObj = [];
  for (const entry of dataList) {
    let key = entry[0];
    let value = entry[1];
    dataObj.push({ key: key, value: value });
  }
  return dataObj;
};

export const calculateBorrowAmount = (formEntries, applicantNo, applicant1Employed, applicant2Employed) => {
  // Calculates the total amount that the applicants can borrow
  const parsedEntries = parseEntries(formEntries);
  let grossMonthlyDebts;
  let grossMonthlyIncome;
  if (applicantNo === 1) {
    if (applicant1Employed === true) {
      grossMonthlyIncome = calculateMonthlyAmount(parsedEntries.slice(7, 10)) / 12;
      grossMonthlyDebts = calculateMonthlyAmount(parsedEntries.slice(10, 13));
    } else {
      grossMonthlyIncome = calculateMonthlyAmount(parsedEntries.slice(7, 8)) / 12;
      grossMonthlyDebts = calculateMonthlyAmount(parsedEntries.slice(8, 11));
    }
  } else {
    if (applicant1Employed === true && applicant2Employed === true) {
      grossMonthlyIncome = calculateMonthlyAmount(parsedEntries.slice(12, 18)) / 12;
      grossMonthlyDebts = calculateMonthlyAmount(parsedEntries.slice(18, 24));
    } else if (applicant1Employed === false && applicant2Employed === false) {
      grossMonthlyIncome = calculateMonthlyAmount(parsedEntries.slice(12, 14)) / 12;
      grossMonthlyDebts = calculateMonthlyAmount(parsedEntries.slice(14, 20));
    } else {
      grossMonthlyIncome = calculateMonthlyAmount(parsedEntries.slice(12, 16)) / 12;
      grossMonthlyDebts = calculateMonthlyAmount(parsedEntries.slice(16, 22));
    }
  }

  const debtToIncomeRatio = grossMonthlyDebts / grossMonthlyIncome;

  if (debtToIncomeRatio < 0.43) {
    const takeHomePay = grossMonthlyIncome - grossMonthlyDebts * 0.807;

    const takeHomeSalary = takeHomePay * 12;

    return takeHomeSalary * 5;
  } else return 0;
};

export const calculateMonthlyAmount = (array) => {
  // Adds up each element['value'] in the provided array and returns the total
  let amount = 0;
  for (const element of array) {
    amount += Number(element['value']);
  }
  return amount;
};
