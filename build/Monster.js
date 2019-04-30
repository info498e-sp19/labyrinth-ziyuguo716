"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Monster {
    constructor(currArea) {
        this.currArea = currArea;
        this.name = 'dementor';
        this.itemName = 'Spell Scroll';
        this.isAtEast = true;
        this.isDead = false;
    }
    setIsDead() {
        this.isDead = true;
    }
    checkMonsterIsDead() {
        return this.isDead;
    }
    getCurrArea() {
        return this.currArea;
    }
    getName() {
        return this.name;
    }
    sayHi() {
        console.log('Oh crap! You run into a Dementor!!!');
        console.log('USE the Spell Scroll immediately if you have one!');
    }
    printFail() {
        console.log('You failed to use secret spell from a scroll to defeat Dementor!');
    }
    getItemName() {
        return this.itemName;
    }
    wander() {
        if (!this.isDead) {
            if (this.isAtEast) {
                this.move('west');
                this.isAtEast = false;
            }
            else {
                this.move('east');
                this.isAtEast = true;
            }
        }
        else {
            return;
        }
    }
    move(direction) {
        let nextMove = this.currArea.getDir();
        nextMove.forEach(x => {
            if (x === direction) {
                this.currArea.removeMonster();
                let idx = nextMove.indexOf(x);
                let nextArea = this.currArea.getNextArea()[idx];
                this.currArea = nextArea;
                this.currArea.addMonster(this);
            }
        });
    }
}
exports.Monster = Monster;
//# sourceMappingURL=Monster.js.map