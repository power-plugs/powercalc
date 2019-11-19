const { Plugin } = require('powercord/entities');

module.exports = class Calc extends Plugin {
  startPlugin() {
    this.registerCommand('calc', [], 'Simple Calculator.', '{c} [num] [op] [num]', (args) => ({send: false, result: "Result: " + this.calc(args)}));
  }

  calc(args) {
    if(args[0] && args[1] && args[2]) {
      var num1 = Number(args[0]);
      var op = args[1];
      var num2 = Number(args[2]);

      switch(op) {
        case "+":
          return num1 + num2;
        case "-":
          return num1 - num2;
        case "*":
          return num1 * num2;
        case "/":
          if(num1 == 0 || num2 == 0) return "Cannot divide by zero.";
          return num1 * num2;
        case "^":
          return num1 ^ num2;
        default:
          return `Unknown Operator: ${op}`;
      }
    } else {
      return `Usage: ${powercord.api.commands.prefix}calc <num1> <op> <num2>`;
    }
  }
};