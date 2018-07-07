class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed() === true) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }
    console.log(`Insufficient funds on withdrawal for: ${this.amount}`);
    return false;
  }
  isAllowed() {
    if (this.constructor.name === "Withdrawal" && this.account.balance < this.amount) {
      return false;
    }
    return true;
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

// const myAccount = new Account("snow-patrol");

// console.log("Starting balance:", myAccount.balance);

// const t1 = new Deposit(120, myAccount);
// t1.commit();

// const t2 = new Withdrawal(50, myAccount);
// t2.commit();

// const t3 = new Withdrawal(90, myAccount);
// t3.commit();

// console.log(`Ending Balance: ${myAccount.balance}`);

// LIGHTHOUSE DRIVER CODE
const myAccount = new Account();

console.log("Starting Account Balance: ", myAccount.balance);

console.log("Attempting to withdraw even $1 should fail...");
const t1 = new Withdrawal(1.0, myAccount);
console.log("Commit result:", t1.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Depositing should succeed...");
const t2 = new Deposit(9.99, myAccount);
console.log("Commit result:", t2.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Withdrawal for 9.99 should be allowed...");
const t3 = new Withdrawal(9.99, myAccount);
console.log("Commit result:", t3.commit());

console.log("Ending Account Balance: ", myAccount.balance);
console.log("Lookings like I'm broke again");

console.log("Account Transaction History: ", myAccount.transactions);
