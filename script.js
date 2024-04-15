const inputContainer = document.querySelector(".input-container");
const inputElement = document.getElementById("input");
const purchaseButton = document.querySelector(".purchase-button");
const costSpan = document.querySelector(".cost-indicator");

let cash;
let price = 3.26;
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

const getChange = (x, y) => Number((x - y).toFixed(2));

window.addEventListener("load", () => {
    costSpan.textContent += `Price: $${price}`;
});

purchaseButton.addEventListener("click", () => {
    cash = Number(inputElement.value);

    if (!inputElement.value) {
        alert("Please input a valid number");
        return;
    } else if (inputElement.value < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    console.log(cash);
    console.log(getChange(cash, price));
    inputElement.value = "";
});
