const inputContainer = document.querySelector(".input-container");
const inputElement = document.getElementById("input");
const outputContainer = document.querySelector(".output-container");
const outputSpan = document.querySelector(".output-span");
const purchaseButton = document.querySelector(".purchase-button");
const priceSpan = document.querySelector(".price-indicator");

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
]

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

const cleanFloat = float => parseFloat((float).toFixed(2));

const changeArrayToString = (changeArray) => {
    return changeArray
        .map((currentArray) => `${currentArray[0]}: $${currentArray[1]}`)
        .join("<br>");
};

const updateChangeDisplay = (cashFromRegister) => {
    const cashFromRegisterStr = changeArrayToString(cashFromRegister);
    const totalCID = cleanFloat(
        cid.slice()
        .reduce(
            (total, currentArray) => total + currentArray[1]
        , 0)
    );
    
    if (cash === price) {
        outputSpan.textContent = "No change due - customer paid with exact cash";
    } else if (cash > totalCID + price) {
        outputSpan.textContent = "Status: INSUFFICIENT_FUNDS";
    } else if (cash === totalCID + price) {
        outputSpan.innerHTML = `Status: CLOSED <br>` + cashFromRegisterStr;
    } else {
        outputSpan.innerHTML = `Status: OPEN <br>` + cashFromRegisterStr;
    }
};

const updateCashInRegister = (change) => {
    for (const changeArr of change) {
        for (const cidArr of cid) {
            if (cidArr.includes(changeArr[0])) {
                cidArr[1] = cidArr[1] - changeArr[1];
            }
        } 
    }
}

const takeCashfromRegister = (change) => {
    const cashFromRegister = [];

    for (const currentDenom of baseCID.toReversed()) {
        if (cleanFloat(change - currentDenom[1]) >= 0) {
            const exactDenom = currentDenom.slice();

            while ((exactDenom[1] + currentDenom[1] - 0.01) < change) {
                exactDenom[1] = cleanFloat(exactDenom[1] + currentDenom[1]);
            }
            
            cashFromRegister.push(exactDenom);
            change = cleanFloat(change - exactDenom[1]);
        }
    }

    return cashFromRegister;
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
    let change = takeCashfromRegister(cleanFloat(cash - price));

    updateCashInRegister(change);
    updateChangeDisplay(change);
    inputElement.value = "";
});

window.addEventListener("load", () => {
    priceSpan.textContent += `Price: $${price}`;
});
