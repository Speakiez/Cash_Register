// Variable Declarations //

const inputContainer = document.querySelector(".input-container");
const inputElement = document.getElementById("input");
const outputContainer = document.querySelector(".output-container");
const outputSpan = document.querySelector(".output-span");
const purchaseButton = document.querySelector(".purchase-button");
const priceSpan = document.querySelector(".price-indicator");
const cidElement = document.querySelector(".cid-element");

const baseCID = [   
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1], 
    ["QUARTER", 0.25], 
    ["ONE", 1], 
    ["FIVE", 5], 
    ["TEN", 10], 
    ["TWENTY", 20], 
    ["ONE HUNDRED", 100]
];

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

let price = 3.26;
let cash;
let change;
let totalCID;
let outputMessage;
let denominationsArray = [];

// Function Declarations //

const cleanFloat = float => parseFloat((float).toFixed(2));

const getTotalCID = () => totalCID = cleanFloat(
    cid.slice()
    .reduce((totalDenom, currentDenom) => totalDenom + currentDenom[1], 0)
);

const updateDrawerDisplay = () => {
    cidElement.innerHTML = `<strong>Change in drawer: </strong><br/>` + cid
        .map((denomination) => `${denomination[0]}: $${denomination[1]}`)
        .join(`<br/>`);
};

const updateOutputDisplay = (outputMessage, denomArray) => {
    if (!denomArray) {
        outputSpan.innerHTML = outputMessage;
        return;
    }

    outputSpan.innerHTML = `${outputMessage}<br/>` + [...denomArray[0]]
        .map((denomination) => `${denomination[0]}: $${denomination[1]}`)
        .join(`<br/>`);
};

const updateValues = (denomArray) => {
    if (!denomArray) return;

    [...denomArray[0]].reverse().forEach(currentDenom => {
        cid.forEach((currentCID => {
            if (currentCID.includes(currentDenom[0])) currentCID[1] = cleanFloat(currentCID[1] - currentDenom[1]);
        }));
    });
};

const isUserInputValid = (userInput) => {
    inputElement.value = "";

    if (isNaN(userInput)) {
        alert("Please input a valid number");
        return false;
    } else if (userInput < price) {
        alert("Customer does not have enough money to purchase the item");
        return false;
    } else if (userInput > cleanFloat(getTotalCID() + price)) {
        updateOutputDisplay("Status: INSUFFICIENT_FUNDS");
        return false;
    }

    return true;
};

const getValuesFromUserInput = (userInput) => {
    cash = cleanFloat(userInput);
    change = cleanFloat(cash - price);
    denominationsArray = getValidDenominations(change);
    totalCID = getTotalCID();

    if (change === 0) {
        outputMessage = "No change due - customer paid with exact cash";
    } else if (!denominationsArray) {
        outputMessage = "Status: INSUFFICIENT_FUNDS";
    } else if (denominationsArray[1] === totalCID) {
        outputMessage = "Status: CLOSED";
    } else {
        outputMessage = "Status: OPEN";
    }
};

const getValidDenominations = (changeCopy) => {
    const maxDenoms = [...cid].reverse();
    const baseDenoms = [...baseCID].reverse();
    const validDenominations = [];

    baseDenoms.forEach(baseDenom => {
        const currentDenom = [...baseDenom];
        const indexOfDenom = baseDenoms.indexOf(baseDenom);
        
        if (
            currentDenom[1] <= changeCopy && 
            currentDenom[1] > 0
        ) {
            while (cleanFloat(currentDenom[1] + baseDenoms[indexOfDenom][1]) <= changeCopy) {
                currentDenom[1] = cleanFloat(currentDenom[1] + baseDenoms[indexOfDenom][1]);
            }

            if (currentDenom[1] >= maxDenoms[indexOfDenom][1]) {
                currentDenom[1] = maxDenoms[indexOfDenom][1];
            } 

            changeCopy = cleanFloat(changeCopy - currentDenom[1]);
            validDenominations.push(currentDenom);
        }
    });

    const totalDenominations = cleanFloat(
        validDenominations.slice()
        .reduce((totalDenom, currentDenom) => totalDenom + currentDenom[1], 0)
    );

    if (totalDenominations >= change) {
        return [validDenominations, totalDenominations];
    }
};

// Event Handling //

purchaseButton.addEventListener("click", () => {
    let userInput = parseFloat(inputElement.value);

    if (!isUserInputValid(userInput)) return;

    getValuesFromUserInput(userInput);
    updateValues(denominationsArray);

    updateDrawerDisplay();
    updateOutputDisplay(outputMessage, denominationsArray);
});

inputElement.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
        return;
    }

    let userInput = parseFloat(inputElement.value);

    if (!isUserInputValid(userInput)) return;

    getValuesFromUserInput(userInput);
    updateValues(denominationsArray);

    updateDrawerDisplay();
    updateOutputDisplay(outputMessage, denominationsArray);
});

window.addEventListener("load", () => {
    priceSpan.textContent = `Price: $${price}`;
    updateDrawerDisplay();
});
