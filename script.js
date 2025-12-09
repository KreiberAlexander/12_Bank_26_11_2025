const bank = [];
// DEBIT CARD (Без Овердрафта)
const bankAccount = {
  accountNumber: "123456789",
  accountHolderName: "Alice",
  balance: 0,
  deposit(sum) {
    // TODO Логика пополнения баланса
    if (sum > 0) {
      this.balance += sum;
      alert(`Успешное пополнение баланса на сумму ${sum}€`);
    } else {
      alert(`Сумма пополнения ${sum}€ отрицательна`);
    }
  },
  withdraw(sum) {
    // TODO Логика списания баланса
    if (this.balance >= sum && sum > 0) {
      this.balance -= sum;
      alert(`Успешное списание баланса на сумму ${sum}€`);
    } else {
      alert(
        `Недостаточно средств для списания (balance: ${this.balance}, sum: ${sum}€) или сумма списания отрицательна`
      );
    }
  },
  checkBalance() {
    // TODO Вывод баланса в консоли
    console.log(this.balance);
  },
};
// bankAccount.checkBalance();
// bankAccount.deposit(1000); // 1000, пополнение прошло успешно
// bankAccount.checkBalance();
// bankAccount.deposit(-1000); // 1000, пополнение не произошло (попытка пополнения отрицательной суммы средств)
// bankAccount.checkBalance();
// bankAccount.withdraw(100); // 900, списание прошло успешно
// bankAccount.checkBalance();
// bankAccount.withdraw(1000); // 900, списание не прошло успешно (потенциальный баланс отрицательный)
// bankAccount.checkBalance();
// bankAccount.withdraw(-10); // 900, списание не прошло успешно (попытка списания отрицательной суммы средств)
// bankAccount.checkBalance();
const inputName = document.getElementById("name");
const showAccounts = document.getElementById("showAccounts");
const accountsList = document.getElementById("accountsList");
function createNewAccount() {
  // console.log(inputName.value);
  // const copyBankAccount = { ...bankAccount };
  // Math.random() * 100 (Увеличение диапазона до 100) (0-100)
  // Math.random() + 20 (Смещение диапазона на 20 вправо)
  // TODO
  // 1. Создать новый аккаунт, где все пункты совпадают с bankAccount, кроме
  //      а) accountNumber: сгенерированное 9-значное число (число должно быть уникальным);
  //      b) accountHolderName: inputName.value.
  // 2. Добавить новый аккаунт в банк.
  if (inputName.value.trim()) {
    const copyBankAccount = { ...bankAccount };
    copyBankAccount.accountHolderName = inputName.value.trim();
    copyBankAccount.accountNumber = Math.floor(Math.random() * 10 ** 9);
    bank.push(copyBankAccount);
    // HOMEWORK: 1. Добавить обновление отображаемого в html списка банковских аккаунтов
    accountsList.innerHTML += `<li id="${copyBankAccount.accountNumber}">${bank.length}. Name: ${copyBankAccount.accountHolderName}, Balance: <span id="${copyBankAccount.accountNumber}Balance">${copyBankAccount.balance}</span>, Account number: ${copyBankAccount.accountNumber}<button id="accountDelete">Delete</button></li>`;
  }
  console.log(bank);
  inputName.value = "";
}
// remove();
// function refreshAccountsList(i) {
//   accountsList.innerHTML = "";
//   // let i = 0;
//   for (const account of bank) {
//     i++;
//     // const li = document.createElement('li');
//     // li.textContent = `${i}. Name: ${account.accountHolderName}, Balance: ${account.balance}`;
//     // accountsList.appendChild(li);
//     accountsList.innerHTML += `<li>${i}. Name: ${account.accountHolderName}, Balance: ${account.balance}, Account number: ${account.accountNumber}</li>`;
//   }
// }
// () => refreshAccountsList          refreshAccountsList        refreshAccountsList()
// () => refreshAccountsList(0)          refreshAccountsList        refreshAccountsList(0)
showAccounts.onclick = () => {
  accountsList.innerHTML = "";
  let i = 0;
  for (const account of bank) {
    i++;
    // const li = document.createElement('li');
    // li.textContent = `${i}. Name: ${account.accountHolderName}, Balance: ${account.balance}`;
    // accountsList.appendChild(li);
    accountsList.innerHTML += `<li>${i}. Name: ${account.accountHolderName}, Balance: ${account.balance}, Account number: ${account.accountNumber}<button id="${copyBankAccount.accountNumber}Delete">X</button></li>`;
    const btnDelete =document.getElementById(`${copyBankAccount.accountNumber}`);
    li.remove();
    //bank.splice( bank.length-1, 1);
    //bank.pop()

  }
  console.log(bank);
  inputName.value ="";
};
const withdraw = document.getElementById("withdraw");
const deposit = document.getElementById("deposit");
const amountInput = document.getElementById("amount");
const accountNumberInput = document.getElementById("accountNumber");
// DRY - Don't Repeat Yourself - Не повторяйся
function changeBalance(operation) {
  const amount = +amountInput.value;
  const accountNumber = +accountNumberInput.value;
  // TODO: Дописать принцип работы при нажатии кнопки withdraw
  const existingElement = bank.find((e) => e.accountNumber === accountNumber);
  const indexOfExistingElement = bank.findIndex((e) => e.accountNumber === accountNumber);
  if (existingElement) {
    operation
      ? existingElement.deposit(amount)
      : existingElement.withdraw(amount);
    // HOMEWORK: 2. Добавить обновление отображаемого в html списка банковских аккаунтов
    const spanBalance = document.getElementById(`${accountNumber}Balance`);
    spanBalance.textContent = existingElement.balance;
  } else {
    alert("Аккаунта с таким номером не найдено. Попробуйте ещё раз");
  }
  amountInput.value = accountNumberInput.value = "";
 
  // refreshAccountsList(0);
}
withdraw.onclick = () => {
  changeBalance(false);
};
deposit.onclick = () => {
  changeBalance(true);
};

// CRUD: ( Create Read Update Delete )