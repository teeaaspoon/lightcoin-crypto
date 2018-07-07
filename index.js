class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    this.time = new Date();
    this.account.addTransaction(this);
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    // Calculate the balance using the transaction objects
    let balance = 0;
    this.transactions.forEach(transaction => {
      if (transaction.constructor.name === "Deposit") {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
    });
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

// console.log("Starting balance:", myAccount.balance);

const t1 = new Deposit(120, myAccount);

t1.commit();

const t2 = new Withdrawal(50, myAccount);
t2.commit();

// console.log(`Ending Balance: ${myAccount.balance}`);
