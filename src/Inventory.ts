import {IItem} from "./Item"
export class Inventory {
    private list: IItem[] = [];
    constructor (){
    }

    public getInventoryList(){
        return this.list;
    }

    public add(item: IItem){
        this.list.push(item);
    }

    public remove(item: IItem){
        let index = this.list.indexOf(item);
        delete this.list[index];
    }
}