import {Location} from './Location'
import {IHazard} from './Hazard'
import {IItem} from "./Item"

export class Area{
    private nextArea: Area[] =[]
    private dir: string[] = []
    private isTaken: boolean = false
    private isClear: boolean = false

    constructor(
        private name: string, 
        private description: string, 
        private location: Location,
        private item?: IItem, 
        private hazard?: IHazard
        ){
            if(this.item == undefined)
                this.isTaken = true
            if(this.hazard == undefined)
                this.isClear = true
        }

    public hasItem(itemName: string): boolean{
        return itemName.toUpperCase() === this.item.getName().toUpperCase();
    }

    public getName(){
        return this.name
    }

    public getLocation(){
        return this.location
    }

    public getItem(){
        return this.item;
    }

    public addItem(item:IItem){
        this.item = item
        this.isTaken = false
    }

    public addHazard(hazard:IHazard){
        this.hazard = hazard
        this.isClear = false
    }

    public setAdjArea(area: Area[]){
        this.nextArea = area
        area.forEach(a => {
            if(a.getLocation().getX() === this.location.getX()){
                if(a.getLocation().getY() === this.location.getY()-1){
                    this.dir.push('west')
                }
                else if (a.getLocation().getY() === this.location.getY()+1){
                    this.dir.push('east')
                }
            }
            else if(a.getLocation().getY() === this.location.getY()){
                if(a.getLocation().getX() === this.location.getX()-1){
                    this.dir.push('north')
                }
                else if (a.getLocation().getX() === this.location.getX()+1){
                    this.dir.push('south')
                }
            }
        });
    }

    public getDir(){
        return this.dir;
    }

    public getNextArea(){
        return this.nextArea;
    }

    public getHazard(){
        return this.hazard;
    }

    public checkTaken(){
        return this.isTaken;
    }

    public checkClear(){
        return this.isClear;
    }

    public removeHazard(){
        this.isClear = true;
    }

    public removeItem(){
        this.isTaken = true;
    }

    public isSameArea(x: number, y: number){
        return this.getLocation().getX()===x && this.getLocation().getY()===y;
    }

    public sayHi(){
        console.log(this.getName().toUpperCase())
        console.log(this.description)
        if (!this.isClear){
            this.hazard.sayHi()
        } else {
            this.showNext();
        }
        if(!this.isTaken){
            this.item.sayHi()
        }
    }

    public showNext(){
        console.log("There are doors to the: ")
        this.dir.forEach(d => {
            console.log(d)
        });
    }
}