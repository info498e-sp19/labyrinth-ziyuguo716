import { Command, CommandParser } from './Parser';
import { Area } from './Area';
import { Location } from './Location'
import { IHazard, Divination, Cliff, Snape } from './Hazard'
import { IItem, FlyingBroom, InvisibleCloak, CrystalBall, SpellScroll, Goblet } from './Item'
import { Player } from './Player';


export class JsonLoader{
    constructor(){}

    private data = require('../SRC/my_data.json');
    private area: Area[] = []
    private player: Player
    

    public parseArea(){

        this.data.areas.forEach(a => {
            this.area.push(new Area(a.name, a.description, new Location(a.locationX,a.locationY)))
        });
    
        let i = 0
        this.data.areas.forEach(a => {
            let temp: Area[] = []
            a.adjacent.forEach(adj => {
                temp.push(this.area[adj])
            });
            this.area[i].setAdjArea(temp)
            i++
         })
        return this.area
    }

    public parseItem(){
        this.data.item.forEach(i => {
            if(i.ID==0)
                this.area[i.area].addItem(new FlyingBroom())
            else if(i.ID==1)
                this.area[i.area].addItem(new InvisibleCloak())
            else if(i.ID==2)
                this.area[i.area].addItem(new CrystalBall())
            else if(i.ID==3)
                this.area[i.area].addItem(new SpellScroll())
            else if(i.ID==4)
                this.area[i.area].addItem(new Goblet())
        });
    }

    public parseHazard(){
        this.data.hazard.forEach(i => {
            if(i.ID==0)
                this.area[i.area].addHazard(new Cliff())
            else if(i.ID==1)
                this.area[i.area].addHazard(new Snape())
            else if(i.ID==2)
                this.area[i.area].addHazard(new Divination())
        });
    }

    public parsePlayer(){
        this.player = new Player(this.area[this.data.player.area])
        return this.player
    }
}