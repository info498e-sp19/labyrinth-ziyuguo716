"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const JsonLoader_1 = require("./JsonLoader");
class Game {
    constructor() {
        this.jsonloader = new JsonLoader_1.JsonLoader();
        this.area = this.jsonloader.parseArea();
        this.player = this.jsonloader.parsePlayer();
        this.monster = this.jsonloader.parseMonster();
        this.jsonloader.parseItem();
        this.jsonloader.parseHazard();
    }
    play() {
        console.log("@@@@@@@@@@@ Harry Porter Labyrinth @@@@@@@@@@@");
        console.log("Welcome to the magic world of Harry Porter!!");
        console.log("What you need to do is to find the Goblet of Fire and bring it to professor Dumbledore");
        console.log("Use items to get over hazards! And prepare to fight with the dementor!");
        console.log("Go young wizard! Good luck!");
        console.log('');
        this.player.getCurrArea().sayHi();
        console.log('');
        console.log('What would you like to do?');
        let parser = new Parser_1.CommandParser(this.handleInput);
        parser.start();
    }
    handleInput(cmd, arg) {
        console.log("@@@@@@@@@@@ Harry Porter Labyrinth @@@@@@@@@@@");
        console.log('Player is !!!!!' + this.player.getCurrArea());
        if (!this.player.checkIsTrapped()) {
            //if player is entangled with monster, 
            //monster does not move until player takes an action
            this.monster.wander();
        }
        if (cmd === Parser_1.Command.GO) {
            this.player.move(arg);
        }
        else if (cmd === Parser_1.Command.TAKE) {
            if (this.player.getCurrArea().hasItem(arg)) {
                this.player.takeItem(this.player.getCurrArea().getItem());
            }
            else {
                console.log('You cannot take ' + arg);
            }
        }
        else if (cmd === Parser_1.Command.USE) {
            this.player.useItem(arg);
        }
        else if (cmd === Parser_1.Command.INVENTORY) {
            this.player.printInventory();
        }
        else if (cmd === Parser_1.Command.LOOK) {
            this.player.look();
        }
        if (this.player.checkPlayerIsDead()) {
            return false;
        }
        if (this.player.isWinner()) {
            return false;
        }
        console.log('');
        console.log('What would you like to do?');
        return true; //return true to indicate that it should prompt for another input
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map