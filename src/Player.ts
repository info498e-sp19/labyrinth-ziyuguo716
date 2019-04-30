import { IItem } from "./Item"
import { Inventory } from "./Inventory"
import { Area } from "./Area"
import { IHazard } from './Hazard'

export class Player {
    private inventory: Inventory = new Inventory();
    private prevArea: Area;
    private hasTreasure: boolean;
    private isTrapByMonster: boolean;
    private isDead: boolean;

    constructor(private currArea: Area) {
        this.prevArea = this.currArea;
        this.hasTreasure = false;
        this.isTrapByMonster = false;
        this.isDead = false;
    }

    public checkIsTrapped() {
        return this.isTrapByMonster;
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

    public checkHasTreasure() {
        return this.hasTreasure;
    }

    public setCurrArea(newArea: Area) {
        this.currArea = newArea;
    }

    public setPrevArea(newArea: Area) {
        this.prevArea = newArea;
    }

    public takeItem(item: IItem) {
        if (this.currArea.checkClear()) {
            this.inventory.add(item);
            this.currArea.removeItem();
            console.log('You now have ' + item.getName())
            if (item.getName() === 'Goblet of Fire') this.hasTreasure = true;
        } else {
            if (this.currArea.getMonster() != undefined) {
                this.currArea.getMonster().printFail();
            }
            this.currArea.getHazard().printFail();
        }

    }

    public checkPlayerIsDead() {
        return this.isDead;
    }

    public move(direction: string): void {
        let nextMove = this.currArea.getDir();
        let isMoved = false;

        if (this.isTrapByMonster) {
            this.currArea.getMonster().printFail();
            this.isDead = true;
            console.log('You Die!!! Game Over!')
            return;
        }

        nextMove.forEach(x => {
            if (x === direction) {
                let idx = nextMove.indexOf(x);
                let nextArea = this.currArea.getNextArea()[idx];

                if (!this.currArea.checkClear() && nextArea != this.prevArea) {
                    this.currArea.getHazard().printFail();
                } else {
                    this.prevArea = this.currArea;
                    this.currArea = nextArea;
                    this.currArea.sayHi();
                    if (this.currArea.hasMonster()) {
                        this.isTrapByMonster = true;
                    }
                    isMoved = true;
                }
            }
        });
        if (!isMoved)
            console.log('You cannot go ' + direction);

    }

    public useItem(item: string) {
        let foundItem = false;
        this.inventory.getInventoryList().forEach(i => {
            if (i.getName().toUpperCase() === item.toUpperCase()) {
                foundItem = true;
                this.inventory.remove(i) //remove item from inventory
                if (item.toUpperCase() === this.currArea.getMonster().getItemName().toUpperCase()) {
                    this.currArea.removeMonster()
                    this.killMonster();
                    this.isTrapByMonster = false;
                    i.printSuccess()
                    return;
                }

                if (item.toUpperCase() === this.currArea.getHazard().getItemName().toUpperCase()) {
                    this.currArea.removeHazard()
                    i.printSuccess()
                    this.currArea.sayBye();
                    return;
                } else {
                    i.printFail()
                    return;
                }
            }
        });
        if (!foundItem) {
            console.log("You don't have this item! Please CHECK your spelling!")
        }
    }

    public killMonster(){
        this.currArea.getMonster().setIsDead(true);
    }

    public look() {
        this.currArea.sayHi();
    }

    public printInventory() {
        console.log('Below is your current inventory list:')
        this.inventory.getInventoryList().forEach(x => {
            console.log(x.getName());
        });
    }

    public isWinner() {
        if (this.currArea.isSameArea(0, 2)) {
            if (this.checkHasTreasure()) {
                console.log('Congrats! You win!!!')
                return true;
            } else {
                console.log('Although you are at the exit, you do not have the treasure....')
                console.log('Please keep searching for the treasure')
                return false;
            }
        }
    }
}
