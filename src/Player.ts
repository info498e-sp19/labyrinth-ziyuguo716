import {IItem} from "./Item"
import {Inventory} from "./Inventory"
import {Area} from "./Area"

export class Player{
    private inventory: Inventory = new Inventory();
    
    constructor(private currArea: Area){}
    
    public getCurrArea(){
        return this.currArea;
    }

    public getInventory(){
        return this.inventory;
    }

    public setCurrArea(newArea: Area){
        this.currArea = newArea;
    }

    public takeItem(item: IItem){
        this.inventory.add(item);
        this.currArea.removeItem();
    }

    public move(direction: string): void {
        let nextMove = this.currArea.getDir();
        nextMove.forEach(x => {
            if (x===direction){
                let idx = nextMove.indexOf(x);
                let nextArea = this.currArea.getNextArea()[idx];
                this.currArea = nextArea;
                nextArea.sayHi();
            } else {
                console.log('You cannot go '+ direction);
            }
        });
    }

    public useItem(item: IItem){
        this.inventory.getInventoryList().forEach(i => {
            if (i===item){
                this.inventory.remove(item) //remove item from inventory
                if (item.getHazard() === this.currArea.getHazard()){
                    this.currArea.removeHazard()
                    item.printSuccess()
                    this.currArea.sayBye();
                }
                else{
                    item.printFail()
                }
            }
            else{
                console.log("You don't have this item!")
            }
        });
    }

    public look(){
        this.currArea.sayHi();
    }

    public printInventory(){
        this.inventory.getInventoryList().forEach(x => {
            console.log(x);
        });
    }
}
