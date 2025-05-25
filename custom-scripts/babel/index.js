module.exports = function (babel) {
  const { types: t } = babel;
  
  return {
    name: "function-in-console",
    visitor: {
      CallExpression(path) {
        // Check if it's a console method call
        if (t.isMemberExpression(path.node.callee) && 
            t.isIdentifier(path.node.callee.object, { name: 'console' })) {
          
          // Get the nearest function declaration/expression
          const functionParent = path.getFunctionParent();
          if (!functionParent) return;

          let functionName = 'anonymous';
          const node = functionParent.node;

          // Handle different types of functions/methods
          if (t.isClassMethod(node)) {
            // Class methods
            functionName = node.key.name;
          } else if (t.isObjectMethod(node)) {
            // Object methods
            functionName = node.key.name;
          } else if (t.isFunctionDeclaration(node) && node.id) {
            // Named function declarations
            functionName = node.id.name;
          } else if (t.isFunctionExpression(node) && node.id) {
            // Named function expressions
            functionName = node.id.name;
          } else if (t.isArrowFunctionExpression(node)) {
            // Arrow functions
            const parent = functionParent.parent;
            if (t.isVariableDeclarator(parent)) {
              // Handle arrow functions assigned to variables
              functionName = parent.id.name;
            } else if (t.isProperty(parent) || t.isObjectProperty(parent)) {
              // Handle arrow functions in objects
              functionName = parent.key.name;
            }
          } else if (t.isJSXElement(functionParent.parentPath)) {
            // Handle JSX components
            const jsxParent = functionParent.findParent(p => t.isJSXElement(p));
            if (jsxParent && jsxParent.node.openingElement) {
              functionName = jsxParent.node.openingElement.name.name;
            }
          }

          // Handle TypeScript methods (for .tsx files)
          if (t.isTSMethodSignature && node.key) {
            functionName = node.key.name;
          }

          // Create string literal with additional context
          let context = '';
          if (t.isClassMethod(node)) {
            const className = functionParent.parentPath.parent.id.name;
            context = `${className}.${functionName}`;
          } else {
            context = functionName;
          }

          const nameArg = t.stringLiteral(`called inside '${context}'`);
          
          // Add function name as first argument
          path.node.arguments.unshift(nameArg);
        }
      }
    }
  };
}