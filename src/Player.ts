import {IItem} from "./Item"
import {Inventory} from "./Inventory"

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
        this.currArea.remove(item);
    }

    public move(nextArea: Area){
        this.currArea=nextArea;
    }
    
    public useItem(item: IItem){
        this.inventory.getInventoryList().forEach(i => {
            if (i===item){
                this.inventory.remove(item) //remove item from inventory
                if (item.getHazard() === this.currArea.getHazard()){
                    area.removeHazard()
                    item.printSuccess()
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
