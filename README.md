# Abstract Syntax Tree (AST) & Babel Learning

## What is Babel?
Babel is a powerful JavaScript compiler that
- Transforms modern JavaScript (ES6+) into backwards compatible code
- Enables JSX transformation for React
- Allows custom code transformations through plugins
- Provides polyfills for new JavaScript features

## Understanding AST
An Abstract Syntax Tree (AST) represents the syntactic structure of source code in a tree format. Each node in the tree represents a construct in the source code.

### Babel's Three-Stage Process
1. **Parse**: Convert source code into AST
2. **Transform**: Modify AST using plugins/presets
3. **Generate**: Convert modified AST back to code

## Getting Started

### Installation
```bash
# Install core dependencies
npm install --save-dev @babel/core @babel/cli babel-loader
npm install --save-dev @babel/preset-env
```

### Custom Plugin Development
```javascript
module.exports = function (babel) {
  const { types: t } = babel;
  
  return {
    name: "my-custom-plugin",
    visitor: {
      // Your transformations here
    }
  };
};
```

### Example: Console Logger Plugin
This plugin adds function names to console calls.

Input:
```javascript
function test() {
    console.log("Hello");
}
```

Output:
```javascript
function test() {
    console.log("called inside 'test'", "Hello");
}
```

## Configuration

### Webpack Setup
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['./custom-scripts/babel']
          }
        }
      }
    ]
  }
};
```

## Development Tools

### AST Explorer
Visit [AST Explorer](https://astexplorer.net/) to:
- Visualize AST structure
- Test transformations
- Debug plugin logic

### Common Babel APIs
- `@babel/core`: Main transformation engine
- `@babel/types`: AST node utilities
- `@babel/traverse`: AST traversal
- `@babel/generator`: Code generation

## Running the Project

```bash
# Start development server
npm start

# Build for production
npm run build
```

## Resources
- [Babel Documentation](https://babeljs.io/docs/en/)
- [AST Explorer](https://astexplorer.net/)
- [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md)
