   let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

const DENOMINATIONS = [
  ["ONE HUNDRED", 100],
  ["TWENTY", 20],
  ["TEN", 10],
  ["FIVE", 5],
  ["ONE", 1],
  ["QUARTER", 0.25],
  ["DIME", 0.10],
  ["NICKEL", 0.05],
  ["PENNY", 0.01]
];

purchaseBtn.addEventListener("click", () => {
  const cash = parseFloat(cashInput.value);
  const change = parseFloat((cash - price).toFixed(2));
  
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }

  let changeLeft = change;
  let changeArr = [];
  let totalCID = parseFloat(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));

  // Give change using available denominations
  for (let [name, value] of DENOMINATIONS) {
    let drawerAmount = cid.find(den => den[0] === name)[1];
    let amountToReturn = 0;

    while (changeLeft >= value && drawerAmount > 0) {
      changeLeft = Math.round((changeLeft - value) * 100) / 100; // avoid floating point errors
      drawerAmount = Math.round((drawerAmount - value) * 100) / 100;
      amountToReturn = Math.round((amountToReturn + value) * 100) / 100;
    }

    if (amountToReturn > 0) {
      changeArr.push([name, amountToReturn]);
    }
  }

  changeLeft = Math.round(changeLeft * 100) / 100;

  if (changeLeft > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  if (totalCID === change) {
    // Drawer will be empty after transaction
    let closedChange = changeArr.map(([name, val]) => `${name}: $${val}`);
    changeDue.textContent = "Status: CLOSED " + closedChange.join(" ");
  } else {
    let openChange = changeArr.map(([name, val]) => `${name}: $${val}`);
    changeDue.textContent = "Status: OPEN " + openChange.join(" ");
  }
});
