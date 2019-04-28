import {Location} from './Location'
import {IHazard} from './Hazard'
import {IItem} from "./Item"

export class Area{
    private nextArea: Area[] =[]
    private dir: string[] = []
    private isTaken = false;
    private isClear = false;

    constructor(
        private name: string, 
        private description: string, 
        private location: Location, 
        private item: IItem, 
        private hazard: IHazard){}

    public getName(){
        return this.name
    }

    public getLocation(){
        return this.location
    }

    public setAdjArea(area: Area[]){
        this.nextArea = area
        area.forEach(a => {
            if(a.getLocation().getX() === this.location.getX()){
                if(a.getLocation().getY() === this.location.getY()-1){
                    this.dir.push('north')
                }
                else if (a.getLocation().getY() === this.location.getY()+1){
                    this.dir.push('south')
                }
            }
            else if(a.getLocation().getY() === this.location.getY()){
                if(a.getLocation().getX() === this.location.getX()-1){
                    this.dir.push('west')
                }
                else if (a.getLocation().getX() === this.location.getX()+1){
                    this.dir.push('east')
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
        return this.hazard.getName();
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

    public sayHi(){
        console.log(this.description)
        if (!this.isClear){
            console.log(this.hazard.sayHi())
        }
        if(!this.isTaken){
            console.log(this.item.sayHi())
        }
    }

    public sayBye(){
        console.log("There are doors to the")
        this.dir.forEach(d => {
            console.log(', '+d)
        });
    }
}