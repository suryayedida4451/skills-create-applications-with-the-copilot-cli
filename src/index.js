#!/usr/bin/env node
/**
 * Node.js CLI Calculator
 * Supported operations:
 *  - Addition: + or add
 *  - Subtraction: - or sub
 *  - Multiplication: * or mul
 *  - Division: / or div
 *
 * Usage examples:
 *  node src/index.js add 2 3
 *  node src/index.js 2 + 3
 *  node src/index.js           # starts interactive REPL
 */

const readline = require('readline');

const { compute } = require('./calculator');

function printUsage() {
  console.log('Node.js CLI Calculator');
  console.log('Supports: +, -, *, / (also: add, sub, mul, div)');
  console.log('\nUsage:');
  console.log('  node src/index.js <op> <num1> <num2>');
  console.log('  node src/index.js <num1> <op> <num2>');
  console.log('Examples:');
  console.log('  node src/index.js add 4 5');
  console.log('  node src/index.js 10 / 2');
  console.log('\nRun without arguments to start an interactive REPL. Type "exit" or Ctrl+C to quit.');
}

function handleArgs(argv) {
  if (argv.length === 0) {
    startREPL();
    return;
  }

  if (argv[0] === 'help' || argv[0] === '--help' || argv[0] === '-h') {
    printUsage();
    return;
  }

  // Two common CLI patterns supported:
  // 1) <op> <num1> <num2>
  // 2) <num1> <op> <num2>
  try {
    if (argv.length === 3) {
      const [a, maybeOp, b] = argv;
      // if middle token is an operator
      if (['+', '-', '*', '/', 'add', 'sub', 'mul', 'div'].includes(maybeOp)) {
        const res = compute(maybeOp, a, b);
        console.log(res);
        return;
      }
      // else assume first token is op
      const res2 = compute(a, maybeOp, b);
      console.log(res2);
      return;
    }

    if (argv.length === 2) {
      // allow "add 1" (incomplete) or "1 +" (incomplete)
      console.error('Not enough arguments.');
      printUsage();
      return;
    }

    // fallback: try parse expression like "2+3" or "2*3"
    const expr = argv.join(' ');
    const match = expr.match(/^(\s*\-?\d+(?:\.\d+)?\s*)([+\-\*\/])(?:\s*\-?\d+(?:\.\d+)?\s*)$/);
    if (match) {
      const a = Number(match[1]);
      const op = match[2];
      const b = Number(expr.split(op)[1]);
      console.log(compute(op, a, b));
      return;
    }

    console.error('Unrecognized arguments.');
    printUsage();
  } catch (err) {
    console.error('Error:', err.message);
    process.exitCode = 2;
  }
}

function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'calc> '
  });

  console.log('Interactive CLI Calculator. Supported operations: +, -, *, /. Type "help" for usage.');
  rl.prompt();

  rl.on('line', (line) => {
    const input = line.trim();
    if (!input) {
      rl.prompt();
      return;
    }
    if (input === 'exit' || input === 'quit') {
      rl.close();
      return;
    }
    if (input === 'help') {
      printUsage();
      rl.prompt();
      return;
    }

    // accept forms: "add 2 3", "2 + 3", "2+3"
    const tokens = input.split(/\s+/);
    try {
      if (tokens.length === 3 && ['+', '-', '*', '/', 'add', 'sub', 'mul', 'div'].includes(tokens[1])) {
        console.log(compute(tokens[1], tokens[0], tokens[2]));
      } else if (tokens.length === 3 && ['+', '-', '*', '/', 'add', 'sub', 'mul', 'div'].includes(tokens[0])) {
        console.log(compute(tokens[0], tokens[1], tokens[2]));
      } else {
        // try expression without spaces
        const m = input.match(/^(\-?\d+(?:\.\d+)?)([+\-\*\/])(\-?\d+(?:\.\d+)?)$/);
        if (m) {
          console.log(compute(m[2], m[1], m[3]));
        } else {
          console.log('Could not parse input. Type "help" for usage.');
        }
      }
    } catch (err) {
      console.log('Error:', err.message);
    }
    rl.prompt();
  }).on('close', () => {
    console.log('Goodbye.');
    process.exit(0);
  });
}

// Entry point
handleArgs(process.argv.slice(2));
