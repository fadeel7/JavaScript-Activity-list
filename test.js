/**
 * Comprehensive test suite for Activity, Payment, and Refund classes
 */

// Import the classes (copy them here for testing)
function Activity(amount) {
    this.amount = amount;
}

Activity.prototype.setAmount = function(value) {
    if (value <= 0) {
        return false;
    }
    this.amount = value;
    return true;
};

Activity.prototype.getAmount = function() {
    return this.amount;
};

function Payment(amount, receiver) {
    Activity.call(this, amount);
    this.receiver = receiver;
}

Payment.prototype = Object.create(Activity.prototype);
Payment.prototype.constructor = Payment;

Payment.prototype.setReceiver = function(receiver) {
    this.receiver = receiver;
};

Payment.prototype.getReceiver = function() {
    return this.receiver;
};

function Refund(amount, sender) {
    Activity.call(this, amount);
    this.sender = sender;
}

Refund.prototype = Object.create(Activity.prototype);
Refund.prototype.constructor = Refund;

Refund.prototype.setSender = function(sender) {
    this.sender = sender;
};

Refund.prototype.getSender = function() {
    return this.sender;
};

// Test Helper
function test(description, fn) {
    try {
        fn();
        console.log(`✅ ${description}`);
    } catch (error) {
        console.log(`❌ ${description}`);
        console.log(`   Error: ${error.message}`);
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

// Run Tests
console.log('\n=================================');
console.log('Activity Class Tests');
console.log('=================================\n');

test('Activity: Constructor sets amount', () => {
    const activity = new Activity(100);
    assert(activity.getAmount() === 100, 'Amount should be 100');
});

test('Activity: setAmount with valid value returns true', () => {
    const activity = new Activity(100);
    assert(activity.setAmount(200) === true, 'Should return true');
    assert(activity.getAmount() === 200, 'Amount should be updated to 200');
});

test('Activity: setAmount with zero returns false', () => {
    const activity = new Activity(100);
    assert(activity.setAmount(0) === false, 'Should return false for zero');
    assert(activity.getAmount() === 100, 'Amount should remain 100');
});

test('Activity: setAmount with negative value returns false', () => {
    const activity = new Activity(100);
    assert(activity.setAmount(-50) === false, 'Should return false for negative');
    assert(activity.getAmount() === 100, 'Amount should remain 100');
});

test('Activity: getAmount returns current amount', () => {
    const activity = new Activity(500);
    assert(activity.getAmount() === 500, 'Should return 500');
});

console.log('\n=================================');
console.log('Payment Class Tests');
console.log('=================================\n');

test('Payment: Constructor sets amount and receiver', () => {
    const payment = new Payment(1000, 'John Doe');
    assert(payment.getAmount() === 1000, 'Amount should be 1000');
    assert(payment.getReceiver() === 'John Doe', 'Receiver should be John Doe');
});

test('Payment: Inherits from Activity', () => {
    const payment = new Payment(500, 'Alice');
    assert(payment instanceof Payment, 'Should be instance of Payment');
    assert(payment instanceof Activity, 'Should be instance of Activity');
    assert(payment instanceof Object, 'Should be instance of Object');
});

test('Payment: setAmount works (inherited)', () => {
    const payment = new Payment(1000, 'Bob');
    assert(payment.setAmount(1500) === true, 'Should return true');
    assert(payment.getAmount() === 1500, 'Amount should be 1500');
});

test('Payment: setAmount validation works (inherited)', () => {
    const payment = new Payment(1000, 'Charlie');
    assert(payment.setAmount(-100) === false, 'Should return false');
    assert(payment.getAmount() === 1000, 'Amount should remain 1000');
});

test('Payment: setReceiver updates receiver', () => {
    const payment = new Payment(2000, 'David');
    payment.setReceiver('Eve');
    assert(payment.getReceiver() === 'Eve', 'Receiver should be Eve');
});

test('Payment: Prototype chain is correct', () => {
    assert(Payment.prototype.hasOwnProperty('setAmount') === false, 
        'setAmount should be inherited');
    assert(Payment.prototype.hasOwnProperty('getAmount') === false, 
        'getAmount should be inherited');
    assert(Payment.prototype.hasOwnProperty('setReceiver') === true, 
        'setReceiver should be own property');
    assert(Payment.prototype.hasOwnProperty('getReceiver') === true, 
        'getReceiver should be own property');
});

console.log('\n=================================');
console.log('Refund Class Tests');
console.log('=================================\n');

test('Refund: Constructor sets amount and sender', () => {
    const refund = new Refund(3000, 'Amazon');
    assert(refund.getAmount() === 3000, 'Amount should be 3000');
    assert(refund.getSender() === 'Amazon', 'Sender should be Amazon');
});

test('Refund: Inherits from Activity', () => {
    const refund = new Refund(500, 'PayPal');
    assert(refund instanceof Refund, 'Should be instance of Refund');
    assert(refund instanceof Activity, 'Should be instance of Activity');
    assert(refund instanceof Object, 'Should be instance of Object');
});

test('Refund: setAmount works (inherited)', () => {
    const refund = new Refund(2000, 'Stripe');
    assert(refund.setAmount(2500) === true, 'Should return true');
    assert(refund.getAmount() === 2500, 'Amount should be 2500');
});

test('Refund: setAmount validation works (inherited)', () => {
    const refund = new Refund(1000, 'Venmo');
    assert(refund.setAmount(0) === false, 'Should return false');
    assert(refund.getAmount() === 1000, 'Amount should remain 1000');
});

test('Refund: setSender updates sender', () => {
    const refund = new Refund(1500, 'Store A');
    refund.setSender('Store B');
    assert(refund.getSender() === 'Store B', 'Sender should be Store B');
});

test('Refund: Prototype chain is correct', () => {
    assert(Refund.prototype.hasOwnProperty('setAmount') === false, 
        'setAmount should be inherited');
    assert(Refund.prototype.hasOwnProperty('getAmount') === false, 
        'getAmount should be inherited');
    assert(Refund.prototype.hasOwnProperty('setSender') === true, 
        'setSender should be own property');
    assert(Refund.prototype.hasOwnProperty('getSender') === true, 
        'getSender should be own property');
});

console.log('\n=================================');
console.log('Edge Cases & Integration Tests');
console.log('=================================\n');

test('Payment and Refund are independent', () => {
    const payment = new Payment(1000, 'Vendor');
    const refund = new Refund(500, 'Customer');
    
    payment.setAmount(1200);
    assert(refund.getAmount() === 500, 'Refund amount should not change');
});

test('Multiple instances work independently', () => {
    const payment1 = new Payment(100, 'A');
    const payment2 = new Payment(200, 'B');
    
    payment1.setReceiver('C');
    assert(payment2.getReceiver() === 'B', 'payment2 receiver should remain B');
});

test('Prototype methods are shared', () => {
    const payment1 = new Payment(100, 'X');
    const payment2 = new Payment(200, 'Y');
    
    assert(payment1.setAmount === payment2.setAmount, 
        'setAmount should be the same function reference');
});

test('Constructor property is correct', () => {
    const payment = new Payment(100, 'Test');
    assert(payment.constructor === Payment, 'Constructor should be Payment');
    
    const refund = new Refund(100, 'Test');
    assert(refund.constructor === Refund, 'Constructor should be Refund');
});

test('Large amounts work correctly', () => {
    const payment = new Payment(999999999, 'BigCorp');
    assert(payment.getAmount() === 999999999, 'Should handle large amounts');
    payment.setAmount(1000000000);
    assert(payment.getAmount() === 1000000000, 'Should update large amounts');
});

test('Special characters in names work', () => {
    const payment = new Payment(100, "John O'Brien");
    assert(payment.getReceiver() === "John O'Brien", 'Should handle apostrophes');
    
    const refund = new Refund(200, 'Café & Restaurant');
    assert(refund.getSender() === 'Café & Restaurant', 'Should handle special chars');
});

console.log('\n=================================');
console.log('All Tests Completed!');
console.log('=================================\n');
