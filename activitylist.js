'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding("ascii");
let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (chunk) {
    inputString += chunk;
});
process.stdin.on("end", function () {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
  return inputString[currentLine++];
}

/**
 * Activity - Base constructor function for financial activities
 * @param {number} amount - The amount for the activity
 */
function Activity(amount) {
    this.amount = amount;
}

/**
 * Set a new amount value with validation
 * @param {number} value - The new amount to set
 * @returns {boolean} - true if amount is valid and set, false otherwise
 */
Activity.prototype.setAmount = function(value) {
    if (value <= 0) {
        return false;
    }
    this.amount = value;
    return true;
};

/**
 * Get the current amount value
 * @returns {number} - The current amount
 */
Activity.prototype.getAmount = function() {
    return this.amount;
};

/**
 * Payment - Constructor function for payment activities
 * Inherits from Activity
 * @param {number} amount - The payment amount
 * @param {string} receiver - The payment receiver
 */
function Payment(amount, receiver) {
    // Call parent constructor to set amount
    Activity.call(this, amount);
    this.receiver = receiver;
}

// Set up prototype chain - Payment inherits from Activity
Payment.prototype = Object.create(Activity.prototype);
Payment.prototype.constructor = Payment;

/**
 * Set the payment receiver
 * @param {string} receiver - The receiver name
 */
Payment.prototype.setReceiver = function(receiver) {
    this.receiver = receiver;
};

/**
 * Get the current payment receiver
 * @returns {string} - The receiver name
 */
Payment.prototype.getReceiver = function() {
    return this.receiver;
};

/**
 * Refund - Constructor function for refund activities
 * Inherits from Activity
 * @param {number} amount - The refund amount
 * @param {string} sender - The refund sender
 */
function Refund(amount, sender) {
    // Call parent constructor to set amount
    Activity.call(this, amount);
    this.sender = sender;
}

// Set up prototype chain - Refund inherits from Activity
Refund.prototype = Object.create(Activity.prototype);
Refund.prototype.constructor = Refund;

/**
 * Set the refund sender
 * @param {string} sender - The sender name
 */
Refund.prototype.setSender = function(sender) {
    this.sender = sender;
};

/**
 * Get the current refund sender
 * @returns {string} - The sender name
 */
Refund.prototype.getSender = function() {
    return this.sender;
};


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    
    const objectType = readLine().trim();
    
    const inputsForObjectCreation = readLine().trim().split(' ');
    const updatedAmount = parseInt(readLine().trim());
    const updatedSenderReceiver = readLine().trim();
    
    switch(objectType) {
        case 'Payment':
            const paymentObj = new Payment(parseInt(inputsForObjectCreation[0]), inputsForObjectCreation[1]);
            ws.write(`Payment object created with amount ${paymentObj.getAmount()} and receiver ${paymentObj.getReceiver()}\n`);
            if(paymentObj.setAmount(updatedAmount)) {
                ws.write(`Amount updated to ${updatedAmount}\n`);
            } else {
                ws.write(`Amount not updated\n`);
            }
            paymentObj.setReceiver(updatedSenderReceiver);
            ws.write(`Receiver updated to ${updatedSenderReceiver}\n`);
            ws.write(`Payment object details - amount is ${paymentObj.getAmount()} and receiver is ${paymentObj.getReceiver()}\n`);
            ws.write(`Payment.prototype has property setAmount: ${Payment.prototype.hasOwnProperty('setAmount')}\n`);
            ws.write(`Payment.prototype has property getAmount: ${Payment.prototype.hasOwnProperty('getAmount')}\n`);
            ws.write(`Payment.prototype has property setReceiver: ${Payment.prototype.hasOwnProperty('setReceiver')}\n`);
            ws.write(`Payment.prototype has property getReceiver: ${Payment.prototype.hasOwnProperty('getReceiver')}\n`);
            break;
        case 'Refund':
            const refundObj = new Refund(parseInt(inputsForObjectCreation[0]), inputsForObjectCreation[1]);
            ws.write(`Refund object created with amount ${refundObj.getAmount()} and sender ${refundObj.getSender()}\n`);
            if(refundObj.setAmount(updatedAmount)) {
                ws.write(`Amount updated to ${updatedAmount}\n`);
            } else {
                ws.write(`Amount not updated\n`);
            }
            refundObj.setSender(updatedSenderReceiver);
            ws.write(`Sender updated to ${updatedSenderReceiver}\n`);
            ws.write(`Refund object details - amount is ${refundObj.getAmount()} and sender is ${refundObj.getSender()}\n`);
            ws.write(`Refund.prototype has property setAmount: ${Refund.prototype.hasOwnProperty('setAmount')}\n`);
            ws.write(`Refund.prototype has property getAmount: ${Refund.prototype.hasOwnProperty('getAmount')}\n`);
            ws.write(`Refund.prototype has property setSender: ${Refund.prototype.hasOwnProperty('setSender')}\n`);
            ws.write(`Refund.prototype has property getSender: ${Refund.prototype.hasOwnProperty('getSender')}\n`);
            break;
        default:
            break;
    }
    
    ws.end();
}
