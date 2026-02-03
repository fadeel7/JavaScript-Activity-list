#  JavaScript Activity List - Prototypal Inheritance Masterclass

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> **A comprehensive implementation demonstrating classical prototypal inheritance patterns in JavaScript** 🚀

Master the art of JavaScript prototypal inheritance through a real-world financial transaction system. This project showcases how to build robust inheritance hierarchies using constructor functions, prototype chains, and the classic inheritance pattern.

---

##  Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Architecture](#-architecture)
- [API Documentation](#-api-documentation)
- [Usage Examples](#-usage-examples)
- [Why This Matters](#-why-this-matters)
- [Testing](#-testing)
- [Contributing](#-contributing)

---

##  Overview

This project implements a **three-tier inheritance hierarchy** for managing financial activities:

```
        Activity (Parent)
           /        \
          /          \
    Payment        Refund
   (Child)        (Child)
```

**What makes this special?**
-  Pure prototypal inheritance (no ES6 classes)
-  Proper prototype chain management
-  Real-world application scenario
-  Educational and production-ready code
-  Comprehensive validation logic

---

##  Features

###  **Base Activity Class**
- Amount management with validation
- Prevents invalid (≤0) amounts
- Getter/setter pattern implementation

###  **Payment Class**
- Inherits all Activity functionality
- Tracks payment receiver
- Manages outgoing transactions

###  **Refund Class**
- Inherits all Activity functionality
- Tracks refund sender
- Manages incoming transactions

###  **Prototype Chain Validation**
- Verifies proper inheritance setup
- Uses `hasOwnProperty()` for chain inspection
- Demonstrates prototype vs. own properties

---

##  Quick Start

### Prerequisites
```bash
Node.js >= 12.0.0
```

### Installation

**Clone the repository:**
```bash
git clone https://github.com/yourusername/javascript-activity-list.git
cd javascript-activity-list
```

**Run the application:**
```bash
node activityList.js < test-cases/payment-example.txt
```

**Run tests:**
```bash
npm test
```

---

##  Architecture

### Inheritance Pattern

This project uses **classical prototypal inheritance** pattern:

```javascript
// 1. Parent Constructor
function Activity(amount) {
    this.amount = amount;
}

// 2. Parent Methods on Prototype
Activity.prototype.setAmount = function(value) { ... }
Activity.prototype.getAmount = function() { ... }

// 3. Child Constructor
function Payment(amount, receiver) {
    Activity.call(this, amount);  // Call parent constructor
    this.receiver = receiver;
}

// 4. Set up Inheritance Chain
Payment.prototype = Object.create(Activity.prototype);
Payment.prototype.constructor = Payment;

// 5. Add Child-Specific Methods
Payment.prototype.setReceiver = function(receiver) { ... }
```

### Prototype Chain Visualization

```
paymentInstance
    ↓
Payment.prototype (has setReceiver, getReceiver)
    ↓
Activity.prototype (has setAmount, getAmount)
    ↓
Object.prototype
    ↓
null
```

---

##  API Documentation

### Activity Class

#### Constructor
```javascript
new Activity(amount)
```
- **Parameters:**
  - `amount` (Number): Initial amount value

#### Methods

**`setAmount(value)`**
- Sets a new amount value
- **Parameters:** `value` (Number)
- **Returns:** `true` if successful, `false` if value ≤ 0
- **Example:**
  ```javascript
  const activity = new Activity(100);
  activity.setAmount(200);  // Returns true
  activity.setAmount(-50);  // Returns false
  ```

**`getAmount()`**
- Retrieves the current amount
- **Returns:** (Number) Current amount value
- **Example:**
  ```javascript
  const activity = new Activity(100);
  console.log(activity.getAmount());  // 100
  ```

---

### Payment Class

#### Constructor
```javascript
new Payment(amount, receiver)
```
- **Parameters:**
  - `amount` (Number): Payment amount
  - `receiver` (String): Payment recipient name

#### Inherited Methods
- `setAmount(value)` - From Activity
- `getAmount()` - From Activity

#### Own Methods

**`setReceiver(receiver)`**
- Updates the payment receiver
- **Parameters:** `receiver` (String)
- **Example:**
  ```javascript
  const payment = new Payment(500, "John Doe");
  payment.setReceiver("Jane Smith");
  ```

**`getReceiver()`**
- Retrieves the current receiver
- **Returns:** (String) Receiver name
- **Example:**
  ```javascript
  const payment = new Payment(500, "John Doe");
  console.log(payment.getReceiver());  // "John Doe"
  ```

---

### Refund Class

#### Constructor
```javascript
new Refund(amount, sender)
```
- **Parameters:**
  - `amount` (Number): Refund amount
  - `sender` (String): Refund sender name

#### Inherited Methods
- `setAmount(value)` - From Activity
- `getAmount()` - From Activity

#### Own Methods

**`setSender(sender)`**
- Updates the refund sender
- **Parameters:** `sender` (String)
- **Example:**
  ```javascript
  const refund = new Refund(300, "Amazon");
  refund.setSender("PayPal");
  ```

**`getSender()`**
- Retrieves the current sender
- **Returns:** (String) Sender name
- **Example:**
  ```javascript
  const refund = new Refund(300, "Amazon");
  console.log(refund.getSender());  // "Amazon"
  ```

---

##  Usage Examples

### Example 1: Creating a Payment

```javascript
// Create a payment of $5000 to John
const payment = new Payment(5000, "John");

console.log(payment.getAmount());    // 5000
console.log(payment.getReceiver());  // "John"

// Update the amount
payment.setAmount(4000);             // Returns true
console.log(payment.getAmount());    // 4000

// Update the receiver
payment.setReceiver("John B");
console.log(payment.getReceiver());  // "John B"

// Try to set invalid amount
payment.setAmount(-100);             // Returns false
console.log(payment.getAmount());    // Still 4000
```

### Example 2: Creating a Refund

```javascript
// Create a refund of $3000 from Amazon
const refund = new Refund(3000, "Amazon");

console.log(refund.getAmount());     // 3000
console.log(refund.getSender());     // "Amazon"

// Update the amount
refund.setAmount(2500);              // Returns true

// Update the sender
refund.setSender("Amazon Prime");
console.log(refund.getSender());     // "Amazon Prime"
```

### Example 3: Prototype Chain Inspection

```javascript
const payment = new Payment(1000, "Vendor");

// Check which methods are own vs inherited
console.log(Payment.prototype.hasOwnProperty('setAmount'));     // false (inherited)
console.log(Payment.prototype.hasOwnProperty('getAmount'));     // false (inherited)
console.log(Payment.prototype.hasOwnProperty('setReceiver'));   // true (own)
console.log(Payment.prototype.hasOwnProperty('getReceiver'));   // true (own)

// Verify inheritance chain
console.log(payment instanceof Payment);   // true
console.log(payment instanceof Activity);  // true
console.log(payment instanceof Object);    // true
```

---

##  Why This Matters

### Understanding JavaScript Inheritance

This project demonstrates core JavaScript concepts:

1. **Constructor Functions** - The foundation of pre-ES6 OOP
2. **Prototype Chain** - How JavaScript implements inheritance
3. **Object.create()** - Proper way to set up inheritance
4. **call() Method** - Invoking parent constructors
5. **hasOwnProperty()** - Distinguishing own vs inherited properties

### Real-World Applications

These patterns are used in:
-  Financial transaction systems
-  Data modeling frameworks
-  Game development (entity hierarchies)
-  Library/framework development
-  Legacy codebase maintenance

### Interview & Learning Value

Perfect for:
-  Coding interviews (prototypal inheritance questions)
-  Understanding pre-ES6 JavaScript patterns
-  Transitioning from ES6 classes to prototypes
-  Teaching JavaScript fundamentals

---

##  Testing

### Run All Tests
```bash
npm test
```

### Test Individual Scenarios

**Payment Test:**
```bash
node activityList.js < test-cases/payment-example.txt
```

**Refund Test:**
```bash
node activityList.js < test-cases/refund-example.txt
```

**Edge Cases:**
```bash
node activityList.js < test-cases/invalid-amount.txt
node activityList.js < test-cases/zero-amount.txt
```

### Expected Output

**Payment Example:**
```
Payment object created with amount 5000 and receiver John
Amount updated to 4000
Receiver updated to John B
Payment object details - amount is 4000 and receiver is John B
Payment.prototype has property setAmount: false
Payment.prototype has property getAmount: false
Payment.prototype has property setReceiver: true
Payment.prototype has property getReceiver: true
```

---

##  Project Structure

```
javascript-activity-list/
├── activityList.js           # Main implementation
├── test.js                   # Unit tests
├── package.json              # npm configuration
├── README.md                 # This file
├── LICENSE                   # MIT License
├── CONTRIBUTING.md           # Contribution guidelines
├── .gitignore               # Git ignore rules
└── test-cases/              # Test input files
    ├── payment-example.txt
    ├── refund-example.txt
    ├── invalid-amount.txt
    └── zero-amount.txt
```

---

##  Contributing

We welcome contributions! Here's how you can help:

1.  Fork the repository
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`)
3.  Add tests for new functionality
4.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5.  Push to the branch (`git push origin feature/AmazingFeature`)
6.  Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

##  Learning Path

### Beginner
1. Understand constructor functions
2. Learn about prototypes
3. Practice with Activity class

### Intermediate
4. Implement Payment and Refund
5. Master the inheritance chain
6. Explore prototype methods

### Advanced
7. Compare with ES6 classes
8. Optimize prototype chain
9. Build custom inheritance patterns

---

##  Additional Resources

- [MDN: Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [JavaScript.info: Prototypal inheritance](https://javascript.info/prototype-inheritance)
- [You Don't Know JS: this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/tree/1st-ed/this%20%26%20object%20prototypes)
- [Understanding JavaScript Prototypes](https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript)

---

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

##  Acknowledgments

- Inspired by real-world financial transaction systems
- Educational resource for JavaScript learners
- Community feedback and contributions

---

##  Contact & Support

- **Issues:** [GitHub Issues](https://github.com/fadeel7/javaScript-activity-list/issues)
- **Discussions:** [GitHub Discussions](https://github.com/fadeel7/javaScript-activity-list/discussions)


---

<div align="center">

###  If you found this helpful, please consider giving it a star!


[⬆ Back to Top](#-javascript-activity-list---prototypal-inheritance-masterclass)

</div>
