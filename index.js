const { Plugin } = require('powercord/entities');

module.exports = class Calc extends Plugin {
  startPlugin() {
    this.registerCommand('calc', [], 'Simple Calculator.', '{c} [num] [op] [num]', (args) => ({send: false, result: "Result: " + this.calc(args)}));
  }

  calc(args) {
    /*if(args[0] && args[1] && args[2]) {
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
          return Math.pow(num1, num2);
        default:
          return `Unknown Operator: ${op}`;
      }
    } else {
      return `Usage: ${powercord.api.commands.prefix} calc <num1> <op> <num2>`;
    }*/

    var state = "none";
    var addsub = [];
    var prevVal = 0;
    var currentval = "";
    var fullVal = "";
    var sum = 0;
    var math = args.join(" ");
      
    function gatherdata(){
      console.log("currentval = " + currentval);
      console.log("prevVal = " + prevVal);
      console.log("sum = " + sum);
    }

    function updateMode(input){
      if(state != "none") {
        switch (state){
          case "-":
            addsub.push(prevVal);
            prevVal = 0 -(parseInt(currentval));
            currentval = "";
            state = input;
            break;
            
          case "+":
            addsub.push(prevVal);
            prevVal = parseInt(currentval);
            currentval = "";
            state = input;
            break;
            
          case "*":
            prevVal = prevVal * parseInt(currentval);
            currentval = "";
            state = input;
            break;
            
          case "/":
            prevVal = prevVal / parseInt(currentval);
            currentval = "";
            state = input;
            break;
          
          case "^":
            prevVal = Math.pow(prevVal, parseInt(currentval));
            currentval = "";
            state = input;
            break;
        }
      } else if (input != "=") {
        prevVal = parseInt(currentval);
        currentval = "";
        sum = 0;
      
        state = input;
      }
      if (input == "="){
        addsub.push(prevVal);
        for(var i = 0; i < addsub.length; i++){
          sum += addsub[i];
        }
      }
    }

    for (let i = 0; i < math.length; i++) {
      const e = math.charAt(i);
      switch(e) {
        case "+":
            if(currentval == "") return
            fullVal += currentval + " + ";
            updateMode("+");
            currentval = "";
            break;

        case "-":
            if(currentval == "") return;
            fullVal += currentval + " - ";
            updateMode("-");
            break;

        case "*":
            if(currentval == "") return;
            fullVal += currentval + " × ";
            updateMode("*");
            break;

        case "/":
            if(currentval == "") return;
            fullVal += currentval + " / ";
            updateMode("/");
            break;
            
        case "^":
            if(currentval == "") return;
            fullVal += currentval + " ^ ";
            updateMode("^");
            break;

        default:
            currentval += e;
            break;
      }
    }

    fullVal += currentval + " = ";
    updateMode("=");
    fullVal += sum;
    currentval = sum;

    return fullVal;
  }
};