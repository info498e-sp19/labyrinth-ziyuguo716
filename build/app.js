"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const Area_1 = require("./Area");
const Location_1 = require("./Location");
const Item_1 = require("./Item");
const JsonLoader_1 = require("./JsonLoader");
function handleInput(cmd, arg) {
    //the arguments are the command and "arguments" the user has entered
    console.log("Handling", cmd, "with argument '" + arg + "'");
    //an example of handling a particular input
    if (cmd === Parser_1.Command.GO) {
        player.move(arg);
        player.isWinner();
    }
    else if (cmd === Parser_1.Command.TAKE) {
        if (player.getCurrArea().hasItem(arg)) {
            player.takeItem(player.getCurrArea().getItem());
        }
        else {
            console.log('You cannot take ' + arg);
        }
    }
    else if (cmd === Parser_1.Command.USE) {
        player.useItem(arg);
    }
    else if (cmd === Parser_1.Command.INVENTORY) {
        player.printInventory();
    }
    else if (cmd === Parser_1.Command.LOOK) {
        player.look();
    }
    return true; //return true to indicate that it should prompt for another input
}
// let area00 = new Area('Slytherin Dungeon', 'You are at Slytherin Dungeon',
//   new Location(0, 0), new Goblet(), new Snape())
// let area01 = new Area('Divination Classroom', 'You are at the divination classroom',
//   new Location(0, 1), undefined, new Divination())
// let area02 = new Area('Dumbledore Office', 'Dumbledore is looking at you',
//   new Location(0, 2))
// let area10 = new Area('Hospital Wing', 'You are at the Hospital Wing.',
//   new Location(1, 0), new InvisibleCloak())
let area11 = new Area_1.Area('Gryffindor Common Room', 'You are at the start point: Gryffindor Common Room', new Location_1.Location(1, 1));
let area12 = new Area_1.Area('Disused Classroom', 'You are at Disused Classroom', new Location_1.Location(1, 2), new Item_1.SpellScroll());
// let area20 = new Area('Forbidden Forest', 'You are at the Forbidden Forest',
//   new Location(2, 0), undefined, new Cliff())
let area21 = new Area_1.Area('Storage Room', 'You are at Storage Room', new Location_1.Location(2, 1), new Item_1.FlyingBroom());
// let area22 = new Area('Trophy Room', 'You are at Trophy Room',
//   new Location(2, 2), new CrystalBall())
// area00.setAdjArea([area01, area10])
// area01.setAdjArea([area00, area02])
// area02.setAdjArea([area01, area12])
// area10.setAdjArea([area00, area20])
area11.setAdjArea([area12, area21]);
// area12.setAdjArea([area02, area11, area22])
// area20.setAdjArea([area10, area21])
// area21.setAdjArea([area11, area20, area22])
// area22.setAdjArea([area21, area12])
// let player = new Player(area11)
let newGame = new JsonLoader_1.JsonLoader();
let area = newGame.parseArea();
let player = newGame.parsePlayer();
newGame.parseItem();
newGame.parseHazard();
console.log(area[4]);
let parser = new Parser_1.CommandParser(handleInput); //pass in the "handler" callback
console.log('Input a command:');
parser.start();
//# sourceMappingURL=app.js.map