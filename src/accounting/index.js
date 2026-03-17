/**
 * Account Management System - Node.js Version
 * 
 * This application is a modernized Node.js port of the legacy COBOL system.
 * It maintains the original business logic, data integrity, and user interface.
 * 
 * Original COBOL Components:
 * - main.cob: Menu-driven interface (MainProgram)
 * - operations.cob: Business logic for transactions (Operations)
 * - data.cob: Account balance storage (DataProgram)
 * 
 * Converted to a single Node.js module with unified business logic.
 */

const readlineSync = require('readline-sync');

/**
 * ============================================================================
 * DATA LAYER - Replaces data.cob (DataProgram)
 * ============================================================================
 * Manages account balance storage and retrieval operations.
 */

class AccountStorage {
  constructor() {
    // STORAGE-BALANCE: PIC 9(6)V99 - Master storage for account balance
    this.storageBalance = 1000.00;
  }

  /**
   * READ Operation: Retrieves the current balance from storage
   * @returns {number} Current balance
   */
  read() {
    return this.storageBalance;
  }

  /**
   * WRITE Operation: Persists the balance to storage
   * @param {number} balance - The balance value to persist
   */
  write(balance) {
    this.storageBalance = balance;
  }
}

/**
 * ============================================================================
 * OPERATIONS LAYER - Replaces operations.cob (Operations)
 * ============================================================================
 * Executes business logic for account transactions and inquiries.
 */

class Operations {
  constructor(storage) {
    this.storage = storage;
  }

  /**
   * TOTAL Operation: View Balance
   * Retrieves current balance from storage and displays to user.
   * No modifications to account.
   */
  viewBalance() {
    const finalBalance = this.storage.read();
    console.log(`Current balance: ${finalBalance.toFixed(2)}`);
  }

  /**
   * CREDIT Operation: Add Funds
   * - Prompts user for credit amount
   * - Retrieves current balance
   * - Adds the credit amount to balance
   * - Persists updated balance to storage
   * - Displays new balance to user
   * 
   * Business Rule: All monetary values use decimal precision to cents
   */
  creditAccount() {
    const amount = readlineSync.questionFloat('Enter credit amount: ', {
      limitMessage: 'Please enter a valid number'
    });

    const finalBalance = this.storage.read();
    const newBalance = finalBalance + amount;
    
    this.storage.write(newBalance);
    console.log(`Amount credited. New balance: ${newBalance.toFixed(2)}`);
  }

  /**
   * DEBIT Operation: Withdraw Funds
   * - Prompts user for debit amount
   * - Retrieves current balance
   * - VALIDATES that sufficient funds exist (FINAL-BALANCE >= AMOUNT)
   * - If valid: Subtracts amount, persists changes, displays new balance
   * - If invalid: Displays "Insufficient funds" message and rejects transaction
   * 
   * Business Rule: Debit transactions are rejected if balance is insufficient
   * Business Rule: Account balance cannot go negative
   */
  debitAccount() {
    const amount = readlineSync.questionFloat('Enter debit amount: ', {
      limitMessage: 'Please enter a valid number'
    });

    const finalBalance = this.storage.read();

    // Validation: Check if sufficient funds exist
    if (finalBalance >= amount) {
      const newBalance = finalBalance - amount;
      this.storage.write(newBalance);
      console.log(`Amount debited. New balance: ${newBalance.toFixed(2)}`);
    } else {
      console.log('Insufficient funds for this debit.');
    }
  }
}

/**
 * ============================================================================
 * UI LAYER - Replaces main.cob (MainProgram)
 * ============================================================================
 * Displays menu-driven interface and coordinates user interactions.
 */

class AccountManagementSystem {
  constructor() {
    this.storage = new AccountStorage();
    this.operations = new Operations(this.storage);
    this.continueFlag = true;
  }

  /**
   * Displays the main menu and prompts user for choice
   */
  displayMenu() {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');
  }

  /**
   * Gets user choice from menu with validation
   * @returns {number} Valid user choice (1-4)
   */
  getUserChoice() {
    const choice = readlineSync.keyInSelect(
      ['View Balance', 'Credit Account', 'Debit Account', 'Exit'],
      'Enter your choice (1-4): ',
      { cancel: false }
    );

    // keyInSelect returns 0-3 for choices or -1 for cancel
    // Adjust to match COBOL menu (1-4)
    return choice + 1;
  }

  /**
   * Routes user choice to appropriate operation
   * @param {number} userChoice - The user's menu selection
   */
  processChoice(userChoice) {
    switch (userChoice) {
      case 1:
        this.operations.viewBalance();
        break;
      case 2:
        this.operations.creditAccount();
        break;
      case 3:
        this.operations.debitAccount();
        break;
      case 4:
        this.continueFlag = false;
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
    }
  }

  /**
   * Main application loop
   * Continues until user selects Exit option
   */
  run() {
    console.log('\n');

    while (this.continueFlag) {
      this.displayMenu();
      const userChoice = this.getUserChoice();
      this.processChoice(userChoice);
      console.log('');
    }

    console.log('Exiting the program. Goodbye!');
  }
}

/**
 * ============================================================================
 * APPLICATION ENTRY POINT
 * ============================================================================
 */

// Create and run the application
const system = new AccountManagementSystem();
system.run();
