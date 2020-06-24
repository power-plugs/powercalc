const { Plugin } = require('powercord/entities');

module.exports = class Calc extends Plugin {
  startPlugin() {
    powercord.api.commands.registerCommand({
        command: 'calc',
        aliases: [],
        description: 'Simple Calculator.',
        usage: '{c} [num] [op] [num]',
        executor: (args) => ({send: false, result: "Result: " + this.calc(args)})
    })
  }

  calc(args) {
    var state = "none";
    var addsub = [];
    var prevVal = 0;
    var currentval = "";
    var fullVal = "";
    var sum = 0;
    var math = args.join(" ");

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
