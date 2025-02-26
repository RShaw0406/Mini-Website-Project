// -------------------- Calculate Deposit --------------------
let depositAmountRangeInput = document.getElementById('depositAmountRangeInput');
let depositAmountValue = document.getElementById('depositAmountValue');
let depositTimeRangeInput = document.getElementById('depositTimeRangeInput');
let depositTimeValue = document.getElementById('depositTimeValue');

export const calculateDeposit = (depositAmountRangeInput, depositTimeRangeInput) => {
  // Calculates the amount of time for a user to save up for a deposit
  let monthsInYear = 12;
  let totalMonthsForDeposit = monthsInYear * depositTimeRangeInput.value;
  let totalMonthlySaving = depositAmountRangeInput.value / totalMonthsForDeposit;
  let monthlySavingsValue = document.getElementById('monthlySavingsValue');
  monthlySavingsValue.innerHTML = '£' + totalMonthlySaving.toFixed(2);
};

calculateDeposit(depositAmountRangeInput, depositTimeRangeInput);

depositAmountValue.innerHTML = '£' + depositAmountRangeInput.value;
depositAmountRangeInput.oninput = () => {
  depositAmountValue.innerHTML = '£' + depositAmountRangeInput.value;
  calculateDeposit(depositAmountRangeInput, depositTimeRangeInput);
};

depositTimeValue.innerHTML = depositTimeRangeInput.value + ' years';
depositTimeRangeInput.oninput = () => {
  depositTimeValue.innerHTML = depositTimeRangeInput.value + ' years';
  calculateDeposit(depositAmountRangeInput, depositTimeRangeInput);
};

// -------------------- Control Deposit Info Modals --------------------
let modalDepositInfo = document.getElementById('modalDepositInfo');
let btnOpenModalDepositAmountInfo = document.getElementById('btnOpenModalDepositAmountInfo');
let btnOpenModalDepositTimeInfo = document.getElementById('btnOpenModalDepositTimeInfo');
let finishedDepositInfo = document.getElementById('finishedDepositInfo');
let headerDepositAmountInfo = document.getElementById('headerDepositAmountInfo');
let headerDepositTimeInfo = document.getElementById('headerDepositTimeInfo');
let divDepositAmountInfo = document.getElementById('divDepositAmountInfo');
let divDepositTimeInfo = document.getElementById('divDepositTimeInfo');

btnOpenModalDepositAmountInfo.onclick = () => {
  modalDepositInfo.style.display = 'block';
  headerDepositAmountInfo.style.display = 'block';
  headerDepositTimeInfo.style.display = 'none';
  divDepositAmountInfo.style.display = 'block';
  divDepositTimeInfo.style.display = 'none';
};

btnOpenModalDepositTimeInfo.onclick = () => {
  modalDepositInfo.style.display = 'block';
  headerDepositAmountInfo.style.display = 'none';
  headerDepositTimeInfo.style.display = 'block';
  divDepositAmountInfo.style.display = 'none';
  divDepositTimeInfo.style.display = 'block';
};

finishedDepositInfo.onclick = () => {
  modalDepositInfo.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === modalDepositInfo) {
    modalDepositInfo.style.display = 'none';
  }
};
