# Contributing to JavaScript Activity List

Thank you for your interest in contributing! 

## How to Contribute

### Reporting Bugs 

If you find a bug:

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear, descriptive title
   - Steps to reproduce the bug
   - Expected vs actual behavior
   - Code samples if applicable
   - Node.js version

### Suggesting Enhancements 

We welcome ideas for improvements:

1. **Open an issue** describing your enhancement
2. Explain **why** it would be useful
3. Provide **examples** of how it would work

### Pull Requests 

#### Before You Start

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make sure all tests pass:
   ```bash
   npm test
   ```

#### Making Changes

1. **Write clear, commented code**
   - Follow existing code style
   - Add JSDoc comments for functions
   - Use descriptive variable names

2. **Add tests** for new functionality
   - Test edge cases
   - Ensure all existing tests still pass

3. **Update documentation**
   - Update README.md if needed
   - Add examples for new features
   - Update API documentation

4. **Commit with clear messages**
   ```bash
   git commit -m "Add: new feature description"
   git commit -m "Fix: bug description"
   git commit -m "Update: documentation changes"
   ```

#### Submitting Your PR

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** with:
   - Clear title and description
   - Reference any related issues
   - Screenshots/examples if applicable

3. **Wait for review**
   - Address any requested changes
   - Keep the conversation friendly and constructive

## Code Style Guidelines

### JavaScript

```javascript
//  Good
function Activity(amount) {
    this.amount = amount;
}

Activity.prototype.getAmount = function() {
    return this.amount;
};

//  Avoid
function Activity(amount){this.amount=amount;}
Activity.prototype.getAmount=function(){return this.amount;}
```

### Comments

```javascript
//  Good - Clear JSDoc comments
/**
 * Set a new amount value with validation
 * @param {number} value - The new amount to set
 * @returns {boolean} - true if valid, false otherwise
 */
Activity.prototype.setAmount = function(value) {
    if (value <= 0) {
        return false;
    }
    this.amount = value;
    return true;
};

//  Avoid - No comments or unclear comments
Activity.prototype.setAmount = function(value) {
    // set amt
    if (value <= 0) return false;
    this.amount = value;
    return true;
};
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific examples
npm run example:payment
npm run example:refund
```

### Writing Tests

Add tests to `test.js`:

```javascript
test('Your test description', () => {
    const payment = new Payment(100, 'Test');
    assert(payment.getAmount() === 100, 'Should equal 100');
});
```

## Project Structure

```
javascript-activity-list/
├── activityList.js       # Main implementation
├── test.js               # Test suite
├── README.md             # Documentation
├── package.json          # Package configuration
├── LICENSE               # MIT License
├── CONTRIBUTING.md       # This file
└── test-cases/           # Test input files
    ├── payment-example.txt
    ├── refund-example.txt
    ├── invalid-amount.txt
    └── zero-amount.txt
```

## Areas We Need Help With

-  Improved documentation and examples
-  More comprehensive test cases
-  Better error messages
-  Internationalization support
-  Performance optimizations
-  Educational tutorials and guides

## Questions?

Feel free to:
- Open an issue for questions
- Start a discussion
- Reach out to maintainers

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what's best for the community

**Unacceptable behavior includes:**
- Harassment or discriminatory language
- Trolling, insulting comments, or personal attacks
- Public or private harassment
- Publishing others' private information

### Enforcement

Violations can be reported to project maintainers. All complaints will be reviewed and investigated.

## Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Credited in documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Quick Checklist for Contributors

Before submitting your PR, make sure:

- [ ] Code follows the project's style guidelines
- [ ] All tests pass (`npm test`)
- [ ] New features have tests
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] No console.logs or debugging code
- [ ] Code is commented where necessary

---

**Thank you for contributing! **

Every contribution, no matter how small, makes this project better.
