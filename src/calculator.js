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

function modulo(a, b) {
  a = Number(a);
  b = Number(b);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error('Operands must be numbers');
  }
  // modulo by zero is allowed in JS but mirrors division-by-zero check
  if (b === 0) throw new Error('Division by zero');
  return a % b;
}

function power(base, exponent) {
  base = Number(base);
  exponent = Number(exponent);
  if (Number.isNaN(base) || Number.isNaN(exponent)) {
    throw new Error('Operands must be numbers');
  }
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  n = Number(n);
  if (Number.isNaN(n)) {
    throw new Error('Operand must be a number');
  }
  if (n < 0) {
    throw new Error('Cannot take square root of negative number');
  }
  return Math.sqrt(n);
}

module.exports = { compute, modulo, power, squareRoot };
