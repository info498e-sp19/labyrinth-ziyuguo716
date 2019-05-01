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
    getCurrArea() {
        return this.currArea;
    }
    getPrevArea() {
        return this.prevArea;
    }
    getInventory() {
        return this.inventory;
    }
    checkPlayerIsDead() {
        return this.isDead;
    }
    checkIsTrapped() {
        return this.isTrapByMonster;
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
    killedByMonster() {
        this.currArea.getMonster().printFail();
        this.isDead = true;
        console.log('You Die!!! Game Over!');
    }
    killMonster() {
        this.currArea.getMonster().setIsDead();
    }
    takeItem(item) {
        //If player is trapped by monster and performs actions
        //Other than USE CORRECT ITEM to kill monster
        //Player will die
        if (this.isTrapByMonster) {
            this.killedByMonster();
            return;
        }
        if (this.currArea.checkClear()) { //player can only take item after hazard is cleared
            this.inventory.add(item);
            console.log('You now have ' + item.getName());
            if (item.getName() === 'Goblet of Fire')
                this.hasTreasure = true;
        }
        else {
            if (this.currArea.getMonster() != undefined) {
                this.currArea.getMonster().printFail(); //Monster does not allow player take item
            }
            this.currArea.getHazard().printFail(); //Hazard does not allow player take item
        }
        //Monster moves after each player's action,
        //This function checks if monster moves to the same location
        this.printMonster();
    }
    move(direction) {
        let nextMove = this.currArea.getDir();
        let isMoved = false;
        if (this.isTrapByMonster) {
            this.killedByMonster();
            return;
        }
        nextMove.forEach(x => {
            if (x === direction) { //Convert direction in string to corresponding area object
                let idx = nextMove.indexOf(x);
                let nextArea = this.currArea.getNextArea()[idx];
                if (!this.currArea.checkClear() && nextArea != this.prevArea) {
                    //When this area has hazard
                    //Player cannot move to other direction, except the prevArea
                    this.currArea.getHazard().printFail();
                }
                else {
                    //Successfully move to next area
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
        // check if the item the user wanna use is in the inventory
        this.inventory.getInventoryList().forEach(i => {
            if (i.getName().toUpperCase() === item.toUpperCase()) {
                foundItem = true;
                if (item.toUpperCase() === 'Goblet of Fire'.toUpperCase()) {
                    console.log('Goblet of Fire is the treasure and you cannot use it. ');
                    console.log('Bring it to professor Dumbledore!!!');
                    return;
                }
                this.inventory.remove(i); //remove item from inventory
                if (this.currArea.hasMonster() &&
                    item.toUpperCase() === this.currArea.getMonster().getItemName().toUpperCase()) {
                    //Use the right item to kill monster
                    this.killMonster();
                    this.currArea.removeMonster();
                    this.isTrapByMonster = false;
                    i.printSuccess();
                }
                else if (!this.currArea.checkClear() &&
                    item.toUpperCase() === this.currArea.getHazard().getItemName().toUpperCase()) {
                    //Use the right item to remove hazard
                    this.currArea.removeHazard();
                    i.printSuccess();
                    this.currArea.showNext();
                }
                else {
                    //Use incorrect item
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
                //WIN if player has treasure and is at EXIT
                console.log('Congrats! You win!!!');
                return true;
            }
            else {
                //Is at the EXIT but without treasure....
                //Keep finding the treasure
                console.log('Although you are at the exit, you do not have the treasure....');
                console.log('Please keep searching for the treasure');
                return false;
            }
        }
    }
    die() {
        console.log('The Dementor took your soul......');
        console.log('Game over! Good luck next time!');
        return false;
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map