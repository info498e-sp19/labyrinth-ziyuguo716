"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Inventory_1 = require("./Inventory");
class Player {
    constructor(currArea) {
        this.currArea = currArea;
        this.inventory = new Inventory_1.Inventory();
        this.prevArea = this.currArea;
        this.hasTreasure = false;
        this.isTrapByMonster = false;
        this.isDead = false;
    }
    checkIsTrapped() {
        return this.isTrapByMonster;
    }
    getCurrArea() {
        return this.currArea;
    }
    getPrevArea() {
        return this.prevArea;
    }
    getInventory() {
        return this.inventory;
    }
    checkHasTreasure() {
        return this.hasTreasure;
    }
    setCurrArea(newArea) {
        this.currArea = newArea;
    }
    setPrevArea(newArea) {
        this.prevArea = newArea;
    }
    takeItem(item) {
        if (this.isTrapByMonster) {
            this.killedByMonster();
            return;
        }
        if (this.currArea.checkClear()) {
            this.inventory.add(item);
            this.currArea.removeItem();
            console.log('You now have ' + item.getName());
            if (item.getName() === 'Goblet of Fire')
                this.hasTreasure = true;
        }
        else {
            if (this.currArea.getMonster() != undefined) {
                this.currArea.getMonster().printFail();
            }
            this.currArea.getHazard().printFail();
        }
        this.printMonster();
    }
    checkPlayerIsDead() {
        return this.isDead;
    }
    killedByMonster() {
        this.currArea.getMonster().printFail();
        this.isDead = true;
        console.log('You Die!!! Game Over!');
    }
    move(direction) {
        let nextMove = this.currArea.getDir();
        let isMoved = false;
        if (this.isTrapByMonster) {
            this.killedByMonster();
            return;
        }
        nextMove.forEach(x => {
            if (x === direction) {
                let idx = nextMove.indexOf(x);
                let nextArea = this.currArea.getNextArea()[idx];
                if (!this.currArea.checkClear() && nextArea != this.prevArea) {
                    this.currArea.getHazard().printFail();
                }
                else {
                    this.prevArea = this.currArea;
                    this.currArea = nextArea;
                    this.currArea.sayHi();
                    isMoved = true;
                }
            }
        });
        if (!isMoved)
            console.log('You cannot go ' + direction);
        this.printMonster();
    }
    useItem(item) {
        let foundItem = false;
        this.inventory.getInventoryList().forEach(i => {
            if (i.getName().toUpperCase() === item.toUpperCase()) {
                foundItem = true;
                this.inventory.remove(i); //remove item from inventory
                if (this.currArea.hasMonster() &&
                    item.toUpperCase() === this.currArea.getMonster().getItemName().toUpperCase()) {
                    this.killMonster();
                    this.currArea.removeMonster();
                    this.isTrapByMonster = false;
                    i.printSuccess();
                }
                else if (!this.currArea.checkClear() &&
                    item.toUpperCase() === this.currArea.getHazard().getItemName().toUpperCase()) {
                    this.currArea.removeHazard();
                    i.printSuccess();
                    this.currArea.sayBye();
                }
                else {
                    i.printFail();
                }
            }
        });
        if (this.isTrapByMonster) {
            this.killedByMonster();
            return;
        }
        if (!foundItem) {
            console.log("You don't have this item! Please CHECK your spelling!");
        }
        this.printMonster();
    }
    killMonster() {
        this.currArea.getMonster().setIsDead();
    }
    look() {
        if (this.isTrapByMonster) {
            this.killedByMonster();
            return;
        }
        this.currArea.sayHi();
        this.printMonster();
    }
    printInventory() {
        if (this.isTrapByMonster) {
            this.killedByMonster();
            return;
        }
        console.log('Below is your current inventory list:');
        this.inventory.getInventoryList().forEach(x => {
            console.log(x.getName());
        });
        this.printMonster();
    }
    printMonster() {
        if (this.currArea.hasMonster()) {
            if (!this.currArea.getMonster().checkMonsterIsDead()) {
                this.currArea.getMonster().sayHi();
                this.isTrapByMonster = true;
            }
        }
    }
    isWinner() {
        if (this.currArea.isSameArea(0, 2)) {
            if (this.checkHasTreasure()) {
                console.log('Congrats! You win!!!');
                return true;
            }
            else {
                console.log('Although you are at the exit, you do not have the treasure....');
                console.log('Please keep searching for the treasure');
                return false;
            }
        }
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map