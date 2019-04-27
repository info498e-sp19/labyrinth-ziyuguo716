"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
//an example input handler function
function handleInput(cmd, arg) {
    //the arguments are the command and "arguments" the user has entered
    console.log("Handling", cmd, "with argument '" + arg + "'");
    //an example of handling a particular input
    if (cmd === Parser_1.Command.GO) {
        console.log("But I want to stay!");
    }
    return true; //return true to indicate that it should prompt for another input
}
//an example of using the CommandParser
let parser = new Parser_1.CommandParser(handleInput); //pass in the "handler" callback
console.log('Input a command:');
parser.start();
//# sourceMappingURL=app.js.map