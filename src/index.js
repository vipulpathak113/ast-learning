class Calculator {
    add(a, b) {
        console.log(`Adding ${a} + ${b}`);
        return a + b;
    }

    subtract(a, b) {
        console.log(`Subtracting ${a} - ${b}`);
        return a - b;
    }

    multiply(a, b) {
        console.log(`Multiplying ${a} * ${b}`);
        return a * b;
    }

    divide(a, b) {
        if (b === 0) {
            console.log('Error: Division by zero');
            throw new Error('Division by zero is not allowed');
        }
        console.log(`Dividing ${a} / ${b}`);
        return a / b;
    }
}

// Example usage
const calc = new Calculator();
console.log('Result:', calc.add(5, 3));      // 8
console.log('Result:', calc.subtract(10, 4)); // 6
console.log('Result:', calc.multiply(4, 2));  // 8
console.log('Result:', calc.divide(15, 3));   // 5