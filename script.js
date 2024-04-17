// Variable Declarations //

const inputContainer = document.querySelector(".input-container");
const inputElement = document.getElementById("input");
const outputContainer = document.querySelector(".output-container");
const outputSpan = document.querySelector(".output-span");
const purchaseButton = document.querySelector(".purchase-button");
const priceSpan = document.querySelector(".price-indicator");
const cidElement = document.querySelector(".cid-element");

let cash;
let change;
let outputMessage;
let denominationsArray;
let price = 19.5;
let cid = [
    ["PENNY", 0.01], 
    ["NICKEL", 0], 
    ["DIME", 0], 
    ["QUARTER", 0.5], 
    ["ONE", 1], 
    ["FIVE", 0], 
    ["TEN", 0], 
    ["TWENTY", 0], 
    ["ONE HUNDRED", 0]
];

let totalCID = 
        cid.slice()
        .reduce((totalDenom, currentDenom) => totalDenom + currentDenom[1], 0);

// Function Declarations //

const cleanFloat = float => parseFloat((float).toFixed(2));

const updateDrawerDisplay = () => {
    cidElement.innerHTML = `<strong>Change in drawer: </strong><br/>` + cid
        .map((denomination) => `${denomination[0]}: $${denomination[1]}`)
        .join(`<br/>`);
};

const validateUserInput = (userInput) => {
    if (isNaN(userInput)) {
        alert("Please input a valid number");
        return;
    }

    cash = userInput;
    change = cleanFloat(cash - price);
    denominationsArray = getValidDenominations(change);

    if (change === 0) {
        outputMessage = "No change due - customer paid with exact cash";
    } else if (!denomArray) {
        outputMessage = "Status: INSUFFICIENT_FUNDS";
    } else if (denomArray[1] === totalCID) {
        outputMessage = "Status: CLOSED";
    } else {
        outputMessage = "Status: OPEN";
    }

    inputElement.value = "";
};

const getValidDenominations = (changeCopy) => {
    const validDenominations = cid.toReversed().map((denomination) => {
        if (
            denomination[1] <= changeCopy && 
            denomination[1] > 0
        ) {
            changeCopy -= denomination[1];
            return denomination;
        }
    })
    .filter(array => array);

    const totalDenominations = 
        validDenominations.slice()
        .reduce((totalDenom, currentDenom) => totalDenom + currentDenom[1], 0);
    
    if (totalDenominations >= change) {
        return [validDenominations, totalDenominations];
    }
};

// Event Handling //

purchaseButton.addEventListener("click", () => {
    validateUserInput(parseFloat(inputElement.value));
});

window.addEventListener("load", () => {
    priceSpan.textContent = `Price: $${price}`;
    updateDrawerDisplay();
});
