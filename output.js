class Calculator {
  add(a, b) {
    console.log("called inside 'Calculator.add'", `Adding ${a} + ${b}`);
    return a + b;
  }
  subtract(a, b) {
    console.log("called inside 'Calculator.subtract'", `Subtracting ${a} - ${b}`);
    return a - b;
  }
  multiply(a, b) {
    console.log("called inside 'Calculator.multiply'", `Multiplying ${a} * ${b}`);
    return a * b;
  }
  divide(a, b) {
    if (b === 0) {
      console.log("called inside 'Calculator.divide'", 'Error: Division by zero');
      throw new Error('Division by zero is not allowed');
    }
    console.log("called inside 'Calculator.divide'", `Dividing ${a} / ${b}`);
    return a / b;
  }
}

// Example usage
const calc = new Calculator();
console.log('Result:', calc.add(5, 3)); // 8
console.log('Result:', calc.subtract(10, 4)); // 6
console.log('Result:', calc.multiply(4, 2)); // 8
console.log('Result:', calc.divide(15, 3)); // 5
