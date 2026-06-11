const { compute, modulo, power, squareRoot } = require('../calculator');

describe('Calculator compute()', () => {
  test('adds two numbers (2 + 3)', () => {
    expect(compute('+', 2, 3)).toBe(5);
    expect(compute('add', 2, 3)).toBe(5);
  });

  test('subtracts two numbers (10 - 4)', () => {
    expect(compute('-', 10, 4)).toBe(6);
    expect(compute('sub', 10, 4)).toBe(6);
  });

  test('multiplies two numbers (45 * 2)', () => {
    expect(compute('*', 45, 2)).toBe(90);
    expect(compute('mul', 45, 2)).toBe(90);
  });

  test('divides two numbers (20 / 5)', () => {
    expect(compute('/', 20, 5)).toBe(4);
    expect(compute('div', 20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => compute('/', 5, 0)).toThrow(/Division by zero/);
  });

  test('non-numeric operands throw', () => {
    expect(() => compute('+', 'a', 2)).toThrow(/Operands must be numbers/);
    expect(() => compute('+', 1, 'b')).toThrow(/Operands must be numbers/);
  });

  test('unsupported operation throws', () => {
    expect(() => compute('%', 2, 3)).toThrow(/Unsupported operation/);
  });

  test('modulo of two numbers (5 % 2)', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('power (2 ^ 3)', () => {
    expect(power(2, 3)).toBe(8);
    expect(power(5, 0)).toBe(1);
  });

  test('squareRoot of positive number (√16)', () => {
    expect(squareRoot(16)).toBe(4);
    expect(squareRoot('25')).toBe(5);
  });

  test('squareRoot of negative number throws', () => {
    expect(() => squareRoot(-9)).toThrow(/Cannot take square root of negative number/);
  });
});
