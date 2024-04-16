const inputContainer = document.querySelector(".input-container");
const inputElement = document.getElementById("input");
const outputContainer = document.querySelector(".output-container");
const outputSpan = document.querySelector(".output-span");
const purchaseButton = document.querySelector(".purchase-button");
const priceSpan = document.querySelector(".price-indicator");

let cash;
let change;
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

const cleanFloat = float => parseFloat((float).toFixed(2));

const getTotalCID = cid => cleanFloat(
    cid.slice()
    .reduce(
        (total, currentArr) => total + currentArr[1]
    , 0)
);

const updateCashRegister = (change) => {
    const totalCID = getTotalCID(cid);
    
    if (cash === price) {
        outputSpan.textContent = "No change due - customer paid with exact cash";
    } else if (cash > totalCID + price) {
        outputSpan.textContent = "Status: INSUFFICIENT_FUNDS";
    } else if (cash === totalCID + price) {
        outputSpan.textContent = "Status: CLOSED";
    } else {
        outputSpan.textContent = "Status: OPEN";
    }

    return totalCID + price;
};

purchaseButton.addEventListener("click", () => {
    if (!inputElement.value) {
        alert("Please input a valid number");
        return;
    } else if (inputElement.value < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    cash = Number(inputElement.value);
    change = cleanFloat(cash - price);
    
    console.log(cash);
    console.log(change);
    console.log(updateCashRegister(change));
    inputElement.value = "";
});

window.addEventListener("load", () => {
    priceSpan.textContent += `Price: $${price}`;
});
