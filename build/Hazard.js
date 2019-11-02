"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliff {
    constructor() {
        this.name = 'cliff';
        this.itemName = 'Flying Broom';
    }
    getName() {
        return this.name;
    }
    sayHi() {
        console.log('A huge deep cliff ahead!');
    }
    printFail() {
        console.log('It\'s too wide to jump over! You will fall down the cliff!');
    }
    getItemName() {
        return this.itemName;
    }
}
exports.Cliff = Cliff;
class Snape {
    constructor() {
        this.name = 'snape';
        this.itemName = 'Cloak of Invisibility';
    }
    getName() {
        return this.name;
    }
    getItemName() {
        return this.itemName;
    }
    sayHi() {
        console.log('Professor Snape is standing in front of you with an angry face.');
    }
    printFail() {
        console.log('Professor doesn\'t give you any chance to approach the Goblet');
    }
}
exports.Snape = Snape;
class Divination {
    constructor() {
        this.name = 'divination';
        this.itemName = 'Crystal Ball';
    }
    getName() {
        return this.name;
    }
    getItemName() {
        return this.itemName;
    }
    sayHi() {
        console.log('Professor Sybill Trelawney is having a divination class.');
    }
    printFail() {
        console.log('Professor Trelawney won\'t let you go if you do not finish the class with your Crystal Ball');
    }
}
exports.Divination = Divination;
//# sourceMappingURL=Hazard.js.map