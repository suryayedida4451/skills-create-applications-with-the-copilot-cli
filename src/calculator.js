/**
 * Calculator module
 * Exports: compute(op, a, b)
 * Supported operations:
 *  - Addition: + or add
 *  - Subtraction: - or sub
 *  - Multiplication: * or mul
 *  - Division: / or div
 */

function compute(op, a, b) {
  a = Number(a);
  b = Number(b);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error('Operands must be numbers');
  }

  switch (op) {
    case '+':
    case 'add':
      return a + b;
    case '-':
    case 'sub':
      return a - b;
    case '*':
    case 'mul':
      return a * b;
    case '/':
    case 'div':
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    default:
      throw new Error('Unsupported operation: ' + op);
  }
}

module.exports = { compute };
