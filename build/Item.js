"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FlyingBroom {
    constructor() {
        this.name = 'Flying Broom';
    }
    sayHi() {
        console.log('There is a Flying Broom on the floor');
    }
    getName() {
        return this.name;
    }
    printSuccess() {
        console.log('You ride the flying broom over the cliff.');
    }
    printFail() {
        console.log('You ride the flying broom around and fly back to where you started. You wasted the broom.');
    }
}
exports.FlyingBroom = FlyingBroom;
class InvisibleCloak {
    constructor() {
        this.name = 'Cloak of Invisibility';
    }
    sayHi() {
        console.log('There is a Cloak of Invisibility hanging on the wall');
    }
    getName() {
        return this.name;
    }
    printSuccess() {
        console.log('You put on the Cloak of Invisibility and go invisible.');
        console.log('Prof. Snape cannot see you now and you have a chance to get the Goblet of Fire!');
    }
    printFail() {
        console.log('You put on the Cloak of Invisibility. But there is nobody around you. You wasted it.');
    }
}
exports.InvisibleCloak = InvisibleCloak;
class CrystalBall {
    constructor() {
        this.name = 'Crystal Ball';
    }
    sayHi() {
        console.log('There is a Crystal Ball behind the door.');
    }
    getName() {
        return this.name;
    }
    printSuccess() {
        console.log('You use the crystal ball in the Divination class and pass the exam.');
    }
    printFail() {
        console.log('You used the crystal ball but nothing happens. You wasted the crystal.');
    }
}
exports.CrystalBall = CrystalBall;
class SpellScroll {
    constructor() {
        this.name = 'Spell Scroll';
    }
    sayHi() {
        console.log('There is a Spell Scroll on the floor.');
    }
    getName() {
        return this.name;
    }
    printSuccess() {
        //"Expecto Patronum!"
        console.log('You use the magic spell that you read from the scroll and summon your Patronus Charm');
        console.log('The Demontor is gone.');
    }
    printFail() {
        console.log('You use the magic spell but there is no Demontor around. You wasted the spell.');
    }
}
exports.SpellScroll = SpellScroll;
class Goblet {
    constructor() {
        this.name = 'Goblet of Fire';
    }
    sayHi() {
        console.log('You must find a way to take the Goblet without his notice.');
    }
    getName() {
        return this.name;
    }
    printSuccess() {
        console.log('You successfully took the Goblet of Fire! Bring it to professor Dumbledore!');
    }
    printFail() {
        console.log('You used the Goblet but nothing happened. You have to bring it to professor Dumbledore!!!');
    }
}
exports.Goblet = Goblet;
//# sourceMappingURL=Item.js.map