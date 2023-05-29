"use strict";

const accounts = [
  {
    id: 1,
    title: "Main Account",
    balance: "6700.56",
    spendings: [
      {
        category: "Rent",
        spent: "1450",
      },
      {
        category: "Groceries",
        spent: "564",
      },
      {
        category: "Restaurants",
        spent: "123",
      },
      {
        category: "Transport",
        spent: "81",
      },
      {
        category: "Internet",
        spent: "50",
      },
    ],
  },
  {
    id: 2,
    title: "Expenses",
    balance: "5134.63",
    spendings: [
      {
        category: "Netflix",
        spent: "19.99",
      },
      {
        category: "HBO Max",
        spent: "14.99",
      },
      {
        category: "Setapp",
        spent: "9.99",
      },
    ],
  },
  {
    id: 3,
    title: "Savings",
    balance: "36500.12",
    spendings: [],
  },
];

onStart();

function onStart() {
  showAccountsOnUI();
}

/**
 * Loads data from Accounts onto the screen
 */
function showAccountsOnUI() {
  // parent element of all accounts in HTML
  const accountsElement = document.querySelector(".accounts");

  // for each account in the vector of accounts
  for (const account of accounts) {
    // a child account is added in the parent element of all accounts
    accountsElement.appendChild(createAccountElement(account));
  }
}

function createAccountElement(account) {
  // add thousand separator in vector raw value
  const balance = Number(account.balance).toLocaleString();

  // account element creation
  const accountElement = document.createElement("div");
  accountElement.classList.add("account");
  accountElement.innerHTML = `
    <p class="account__title">${account.title}</p>
    <p class="account__value">$${balance}</p>
  `;

  // Account spending is shown when the user hovers over the account
  accountElement.addEventListener("mouseenter", function () {
    showAccountSpendings(this);
  });

  return accountElement;
}

/**
 * This function is called when the user hovers the mouse over
 * specific account on the screen
 */
function showAccountSpendings(accountElement) {
  // get account name
  const accountTitle =
    accountElement.querySelector(".account__title").innerText;
  // get the expenses related to the selected account
  const spendings = getSpendings(accountTitle);
  // parent element of all spendings in HTML
  const spendingsElement = document.querySelector(".spendings");
  // clear all spendings
  spendingsElement.innerHTML = "";
  // for all account-related expenses
  for (const spending of spendings) {
    // a child spending is added in the parent element of all spendings
    spendingsElement.appendChild(createSpendingElement(spending));
  }
}

function getSpendings(accountTitle) {
  for (const account of accounts) {
    if (accountTitle === account.title) {
      return account.spendings;
    }
  }
}

function createSpendingElement(spending) {
  // add thousand separator in vector raw value
  const spent = Number(spending.spent).toLocaleString();

  // spending element creation
  const spendingElement = document.createElement("div");
  spendingElement.classList.add("spending");
  spendingElement.innerHTML = `
    <p class="spending__title">${spending.category}</p>
    <p class="spending__value">$${spent}</p>
  `;
  return spendingElement;
}
