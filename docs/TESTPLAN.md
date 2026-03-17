# COBOL Account Management System - Test Plan

## Overview
This test plan covers functional testing of the Student Account Management System COBOL application. It validates all business logic including balance inquiries, credit transactions, debit transactions, and input validation.

---

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|---|---|---|---|---|---|---|---|
| TC001 | Verify application starts successfully | None | 1. Run ./accountsystem | Application displays main menu with 4 options (View Balance, Credit Account, Debit Account, Exit) | | | |
| TC002 | Verify menu displays correct options | Application running | 1. Observe main menu | Menu displays:<br/>- "Account Management System"<br/>- "1. View Balance"<br/>- "2. Credit Account"<br/>- "3. Debit Account"<br/>- "4. Exit"<br/>- "Enter your choice (1-4):" | | | |
| TC003 | Verify invalid choice '5' is rejected | Application at menu | 1. Enter '5' at menu prompt | Error message: "Invalid choice, please select 1-4." is displayed<br/>Menu reappears for next input | | | |
| TC004 | Verify invalid choice '0' is rejected | Application at menu | 1. Enter '0' at menu prompt | Error message: "Invalid choice, please select 1-4." is displayed<br/>Menu reappears for next input | | | |
| TC005 | Verify invalid choice 'A' is rejected | Application at menu | 1. Enter 'A' at menu prompt | Error message: "Invalid choice, please select 1-4." is displayed<br/>Menu reappears for next input | | | |
| TC006 | View initial account balance | Application at menu | 1. Enter '1' to View Balance | Message displays: "Current balance: 1000.00"<br/>Menu reappears | | | Initial balance is $1000.00 |
| TC007 | View balance - read-only operation | Application showing balance | 1. Enter '1' to View Balance<br/>2. Observe balance<br/>3. Enter '1' again to View Balance | Balance remains 1000.00 (no changes) | | | Verifies balance is not modified by read operation |
| TC008 | Credit account - valid positive amount | Application at menu with balance 1000.00 | 1. Enter '2' for Credit Account<br/>2. Enter '500' for credit amount | Prompt displays: "Enter credit amount:"<br/>Message displays: "Amount credited. New balance: 1500.00"<br/>Menu reappears | | | Tests basic credit functionality |
| TC009 | Credit account - small amount | Application at menu with balance 1500.00 | 1. Enter '2' for Credit Account<br/>2. Enter '0.50' for credit amount | Message displays: "Amount credited. New balance: 1500.50"<br/>Menu reappears | | | Tests decimal precision (cents) |
| TC010 | Credit account - verify persistent balance | Application at menu after credit (balance 1500.50) | 1. Enter '1' to View Balance | Message displays: "Current balance: 1500.50" | | | Verifies credit was persisted to storage |
| TC011 | Credit account - large amount | Application at menu | 1. Enter '2' for Credit Account<br/>2. Enter '999999' for credit amount | Message displays: "Amount credited. New balance: 1000000.00"<br/>(or handles overflow appropriately) | | | Tests system limits (max 999,999.99) |
| TC012 | Debit account - valid amount with sufficient funds | Application at menu with balance 1500.50 | 1. Enter '3' for Debit Account<br/>2. Enter '300' for debit amount | Prompt displays: "Enter debit amount:"<br/>Message displays: "Amount debited. New balance: 1200.50"<br/>Menu reappears | | | Tests basic debit functionality |
| TC013 | Debit account - deduct to zero balance | Application at menu with balance 1200.50 | 1. Enter '3' for Debit Account<br/>2. Enter '1200.50' for debit amount | Message displays: "Amount debited. New balance: 0.00"<br/>Menu reappears | | | Tests boundary condition - debit exact balance |
| TC014 | Debit account - insufficient funds (exact comparison) | Application at menu with balance 0.00 | 1. Enter '3' for Debit Account<br/>2. Enter '1' for debit amount | Message displays: "Insufficient funds for this debit."<br/>Balance remains: 0.00<br/>Menu reappears | | | Tests insufficient funds validation |
| TC015 | Debit account - insufficient funds (partial amount) | Application at menu with balance 500.00 | 1. Enter '3' for Debit Account<br/>2. Enter '600' for debit amount | Message displays: "Insufficient funds for this debit."<br/>Balance remains: 500.00<br/>Menu reappears | | | Tests debit validation with insufficient funds |
| TC016 | Debit account - small amount | Application at menu with balance 100.00 | 1. Enter '3' for Debit Account<br/>2. Enter '0.50' for debit amount | Message displays: "Amount debited. New balance: 99.50"<br/>Menu reappears | | | Tests decimal precision in debit |
| TC017 | Debit account - verify no balance change on rejection | Application at menu with balance 100.00 | 1. Enter '3' for Debit Account<br/>2. Enter '200' for debit amount (insufficient)<br/>3. Enter '1' to View Balance | Message displays "Insufficient funds..."<br/>Next balance shown: 100.00 (unchanged) | | | Verifies failed debit does not modify balance |
| TC018 | Debit account - verify persistent balance | Application at menu after debit (balance 99.50) | 1. Enter '1' to View Balance | Message displays: "Current balance: 99.50" | | | Verifies debit was persisted to storage |
| TC019 | Multiple sequential credits | Application at menu with balance 1000.00 | 1. Enter '2', Credit 100 → Balance: 1100.00<br/>2. Enter '2', Credit 200 → Balance: 1300.00<br/>3. Enter '2', Credit 50 → Balance: 1350.00<br/>4. Enter '1' to View Balance | Final message displays: "Current balance: 1350.00" | | | Tests sequential credit operations |
| TC020 | Multiple sequential debits | Application at menu with balance 1350.00 | 1. Enter '3', Debit 100 → Balance: 1250.00<br/>2. Enter '3', Debit 200 → Balance: 1050.00<br/>3. Enter '3', Debit 50 → Balance: 1000.00<br/>4. Enter '1' to View Balance | Final message displays: "Current balance: 1000.00" | | | Tests sequential debit operations |
| TC021 | mixedcredit and debit operations | Application at menu with balance 1000.00 | 1. Enter '2', Credit 500 → Balance: 1500.00<br/>2. Enter '3', Debit 300 → Balance: 1200.00<br/>3. Enter '2', Credit 100 → Balance: 1300.00<br/>4. Enter '1' to View Balance | Final message displays: "Current balance: 1300.00" | | | Tests mixed operation sequence |
| TC022 | Exit application | Application at menu | 1. Enter '4' to Exit | Message displays: "Exiting the program. Goodbye!"<br/>Program terminates<br/>Command prompt returns | | | Tests exit functionality |
| TC023 | Menu loop after invalid input | Application at menu | 1. Enter '5' (invalid)<br/>2. Error shown<br/>3. Enter '1' to View Balance | Error message shown<br/>Menu reappears<br/>View Balance works correctly after error | | | Verifies menu continues after invalid choice |
| TC024 | Menu loop after operation | Application at menu | 1. Enter '1' to View Balance<br/>2. Balance displayed<br/>3. Enter '2' to Credit<br/>4. Enter '100'<br/>5. Credit confirmed | After each operation, menu reappears for next selection | | | Tests continuous loop functionality |
| TC025 | Credit with zero amount | Application at menu with balance 1000.00 | 1. Enter '2' for Credit Account<br/>2. Enter '0' for credit amount | Message displays: "Amount credited. New balance: 1000.00"<br/>Menu reappears | | | Tests edge case - zero credit (no change) |
| TC026 | Debit with zero amount | Application at menu with balance 1000.00 | 1. Enter '3' for Debit Account<br/>2. Enter '0' for debit amount | If amount is zero:<br/>- Either rejected as invalid input<br/>- Or: "Amount debited. New balance: 1000.00" | | | Tests edge case - zero debit |
| TC027 | Negative credit amount handling | Application at menu | 1. Enter '2' for Credit Account<br/>2. Enter '-100' for credit amount | System behavior depends on implementation:<br/>- Rejects negative value<br/>- Or treats as debit (subtracts) | | | Note: Current implementation may not validate |
| TC028 | Negative debit amount handling | Application at menu | 1. Enter '3' for Debit Account<br/>2. Enter '-100' for debit amount | System behavior depends on implementation:<br/>- Rejects negative value<br/>- Or treats as credit (adds) | | | Note: Current implementation may not validate |
| TC029 | Balance persistence across multiple view operations | Application at menu | 1. Credit 500<br/>2. View Balance<br/>3. Exit and Restart<br/>4. View Balance | Balance remains 1500.00 after restart if persistent storage is used<br/>Or resets to 1000.00 if in-memory only | | | Note: System uses in-memory storage; resets on restart |
| TC030 | Maximum balance boundary | Application at menu | 1. Enter '2' for Credit Account<br/>2. Enter '998999' to reach near-limit | System should:<br/>- Accept and display result<br/>- Or validate maximum (999,999.99) | | | Tests upper boundary of PIC 9(6)V99 |

---

## Test Execution Notes

### Balance Persistence
- The current COBOL implementation uses in-memory storage (`STORAGE-BALANCE` in `data.cob`)
- Balance resets to $1000.00 when the application restarts
- No database or file persistence is currently implemented

### Data Precision
- All monetary values use PIC 9(6)V99 format (6 digits + 2 decimal places)
- Maximum balance: $999,999.99
- Minimum balance: $0.00
- Cents precision: .00 format

### Validation Rules
- Menu choices must be 1-4; others rejected
- Debit transactions require sufficient funds (balance >= debit amount)
- Credit and debit amounts should ideally be validated for positive values (currently not enforced)
- No transaction limits or daily caps exist in current implementation

### Future Test Enhancements
When migrating to Node.js, consider adding tests for:
- Negative amount rejection
- Large decimal precision handling
- Persistent database storage
- Transaction logging and history
- Concurrent transaction handling
- Authentication and user sessions
- API request/response validation
