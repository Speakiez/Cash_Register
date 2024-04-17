const inputContainer = document.querySelector(".input-container");
const inputElement = document.getElementById("input");
const outputContainer = document.querySelector(".output-container");
const outputSpan = document.querySelector(".output-span");
const purchaseButton = document.querySelector(".purchase-button");
const priceSpan = document.querySelector(".price-indicator");
const cidElement = document.querySelector(".cid-element");

let cash;
let change;
let price = 19.5;
let cid = [
    ["PENNY", 0.01], 
    ["NICKEL", 0], 
    ["DIME", 0], 
    ["QUARTER", 0], 
    ["ONE", 1], 
    ["FIVE", 0], 
    ["TEN", 0], 
    ["TWENTY", 0], 
    ["ONE HUNDRED", 0]
];

const updateDrawerDisplay = () => {
    cidElement.innerHTML = `<strong>Change in drawer: </strong><br/>` + cid
        .map((denominator) => `${denominator[0]}: $${denominator[1]}`)
        .join(`<br/>`);
};

window.addEventListener("load", () => {
    priceSpan.textContent = `
    Price: $${price}
    `;

    updateDrawerDisplay();
});