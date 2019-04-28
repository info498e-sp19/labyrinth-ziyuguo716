import {Location} from './Location'
import {IHazard} from './Hazard'
import { dirname } from 'path';

export class Area{
    private nextArea: Area[]
    private dir = []

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

    public setAdj(area: Area[]){
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

    public removeHazard(){
        this.hazard = null
    }

    public removeItem(){
        this.item = null
    }

    public sayHi(){
        console.log(this.description)
        if (this.hazard != null){
            console.log(this.hazard.sayHi())
        }
        if(this.item != null){
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