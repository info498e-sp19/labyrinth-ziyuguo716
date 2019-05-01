import { Command, CommandParser } from './Parser';
import { Area } from './Area';
import { Location } from './Location'
import { IHazard, Divination, Cliff, Snape } from './Hazard'
import { IItem, FlyingBroom, InvisibleCloak, CrystalBall, SpellScroll, Goblet } from './Item'
import { Player } from './Player';
import { Monster } from './Monster';


export class JsonLoader{
    constructor(){}

    private data = require('../SRC/my_data.json');
    private area: Area[] = []
    private player: Player
    private monster: Monster
    

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
            if(i.ID==0){
                i.area.forEach(a => {
                    this.area[a].addItem(new FlyingBroom())
                });
            }
            else if(i.ID==1){
                i.area.forEach(a => {
                    this.area[a].addItem(new InvisibleCloak())
                });
            }
            else if(i.ID==2){
                i.area.forEach(a => {
                    this.area[a].addItem(new CrystalBall())
                });
            }
            else if(i.ID==3){
                i.area.forEach(a => {
                    this.area[a].addItem(new SpellScroll())
                });
            }
            else if(i.ID==4){
                i.area.forEach(a => {
                    this.area[a].addItem(new Goblet())
                });
            }
        });
    }

    public parseHazard(){
        this.data.hazard.forEach(h => {
            if(h.ID==0){
                h.area.forEach(a => {
                    this.area[a].addHazard(new Cliff())
                });
            }
            else if(h.ID==1){
                h.area.forEach(a => {
                    this.area[a].addHazard(new Snape())
                });
            }
            else if(h.ID==2){
                h.area.forEach(a => {
                    this.area[a].addHazard(new Divination())
                });
            }
        });
    }

    public parseMonster(){
        this.monster = new Monster(this.area[this.data.monster.area])
        return this.monster
    }

    public parsePlayer(){
        this.player = new Player(this.area[this.data.player.area])
        return this.player
    }
}