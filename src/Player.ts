import { IItem } from "./Item"
import { Inventory } from "./Inventory"
import { Area } from "./Area"
import { IHazard } from './Hazard'

export class Player {
    private inventory: Inventory = new Inventory();
    /** Stores the location this player moves from,
     * so that when encounter hazard, this player can and only can move back there
     */
    private prevArea: Area; 
    /** Winning conditions:
     * 1. Player is at EXIT
     * 2. Player has the TREASURE
     */
    private hasTreasure: boolean;
    /** When encountering MONSTER,
     * Player only has ONE chance to kill it
     * This variable freezes both player and monster
     * and gives player one move to kill the monster
     */
    private isTrapByMonster: boolean;
    private isDead: boolean;

    constructor(private currArea: Area) {
        this.prevArea = this.currArea;
        this.hasTreasure = false;
        this.isTrapByMonster = false;
        this.isDead = false;
    }

    public getCurrArea() {
        return this.currArea;
    }

    public getPrevArea() {
        return this.prevArea;
    }

    public getInventory() {
        return this.inventory;
    }

    public checkPlayerIsDead() {
        return this.isDead;
    }

    public checkIsTrapped() {
        return this.isTrapByMonster;
    }

    public checkHasTreasure() {
        return this.hasTreasure;
    }

    public setCurrArea(newArea: Area) {
        this.currArea = newArea;
    }

    public setPrevArea(newArea: Area) {
        this.prevArea = newArea;
    }

    public killedByMonster(): void {
        this.currArea.getMonster().printFail();
        this.isDead = true;
        console.log('You Die!!! Game Over!')
    }

    public killMonster() {
        this.currArea.getMonster().setIsDead();
    }

    public takeItem(item: IItem) {
        //If player is trapped by monster and performs actions
        //Other than USE CORRECT ITEM to kill monster
        //Player will die
        if (this.isTrapByMonster) {
            this.killedByMonster();
            return;
        }
        if (this.currArea.checkClear()) {//player can only take item after hazard is cleared
            this.inventory.add(item);
            this.currArea.removeItem();
            console.log('You now have ' + item.getName())
            if (item.getName() === 'Goblet of Fire') this.hasTreasure = true;
        } else {
            if (this.currArea.getMonster() != undefined) {
                this.currArea.getMonster().printFail(); //Monster does not allow player take item
            }
            this.currArea.getHazard().printFail(); //Hazard does not allow player take item
        }

        //Monster moves after each player's action,
        //This function checks if monster moves to the same location
        this.printMonster(); 
    }

    public move(direction: string): void {
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
                } else {
                    //Successfully move to next area
                    this.prevArea = this.currArea;
                    this.currArea = nextArea;
                    this.currArea.sayHi();

                    isMoved = true;
                }
            }
        });
        if (!isMoved) console.log('You cannot go ' + direction);

        this.printMonster();
    }

    public useItem(item: string) {
        let foundItem = false;
        this.inventory.getInventoryList().forEach(i => {
            if (i.getName().toUpperCase() === item.toUpperCase()) {
                foundItem = true;
                this.inventory.remove(i) //remove item from inventory
                if (this.currArea.hasMonster() &&
                    item.toUpperCase() === this.currArea.getMonster().getItemName().toUpperCase()) {
                    
                    //Use the right item to kill monster
                    this.killMonster();
                    this.currArea.removeMonster();
                    this.isTrapByMonster = false;
                    i.printSuccess();
                } else if (!this.currArea.checkClear() &&
                    item.toUpperCase() === this.currArea.getHazard().getItemName().toUpperCase()) {
                    
                    //Use the right item to remove hazard
                    this.currArea.removeHazard();
                    i.printSuccess();
                    this.currArea.sayBye();
                } else {
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
            console.log("You don't have this item! Please CHECK your spelling!")
        }
        this.printMonster();
    }

    public look() {
        if (this.isTrapByMonster) {
            this.killedByMonster();
            return;
        }
        this.currArea.sayHi();
        this.printMonster();
    }

    public printInventory() {
        if (this.isTrapByMonster) {
            this.killedByMonster();
            return;
        }
        console.log('Below is your current inventory list:')
        this.inventory.getInventoryList().forEach(x => {
            console.log(x.getName());
        });
        this.printMonster();
    }

    public printMonster() {
        if (this.currArea.hasMonster()) {
            if (!this.currArea.getMonster().checkMonsterIsDead()) {
                this.currArea.getMonster().sayHi();
                this.isTrapByMonster = true;
            }
        }
    }

    public isWinner() {
        if (this.currArea.isSameArea(0, 2)) {
            if (this.checkHasTreasure()) {
                //WIN if player has treasure and is at EXIT
                console.log('Congrats! You win!!!')
                return true;
            } else {
                //Is at the EXIT but without treasure....
                //Keep finding the treasure
                console.log('Although you are at the exit, you do not have the treasure....')
                console.log('Please keep searching for the treasure')
                return false;
            }
        }
    }
}
