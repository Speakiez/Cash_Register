const inputContainer = document.querySelector(".input-container");
const inputElement = document.getElementById("input");
const purchaseButton = document.querySelector(".purchase-button");

let cash;
let price = 1.87;
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

purchaseButton.addEventListener("click", () => {
    if (!inputElement.value) {
        alert("Please input a valid number");
        return;
    }
    
    cash = inputElement.value;
    inputElement.value = "";
    console.log(cash);
});
