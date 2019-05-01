"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Area_1 = require("./Area");
const Location_1 = require("./Location");
const Hazard_1 = require("./Hazard");
const Item_1 = require("./Item");
const Player_1 = require("./Player");
const Monster_1 = require("./Monster");
class JsonLoader {
    constructor() {
        this.data = require('../SRC/my_data.json');
        this.area = [];
    }
    parseArea() {
        this.data.areas.forEach(a => {
            this.area.push(new Area_1.Area(a.name, a.description, new Location_1.Location(a.locationX, a.locationY)));
        });
        let i = 0;
        this.data.areas.forEach(a => {
            let temp = [];
            a.adjacent.forEach(adj => {
                temp.push(this.area[adj]);
            });
            this.area[i].setAdjArea(temp);
            i++;
        });
        return this.area;
    }
    parseItem() {
        this.data.item.forEach(i => {
            if (i.ID == 0) {
                i.area.forEach(a => {
                    this.area[a].addItem(new Item_1.FlyingBroom());
                });
            }
            else if (i.ID == 1) {
                i.area.forEach(a => {
                    this.area[a].addItem(new Item_1.InvisibleCloak());
                });
            }
            else if (i.ID == 2) {
                i.area.forEach(a => {
                    this.area[a].addItem(new Item_1.CrystalBall());
                });
            }
            else if (i.ID == 3) {
                i.area.forEach(a => {
                    this.area[a].addItem(new Item_1.SpellScroll());
                });
            }
            else if (i.ID == 4) {
                i.area.forEach(a => {
                    this.area[a].addItem(new Item_1.Goblet());
                });
            }
        });
    }
    parseHazard() {
        this.data.hazard.forEach(h => {
            if (h.ID == 0) {
                h.area.forEach(a => {
                    this.area[a].addHazard(new Hazard_1.Cliff());
                });
            }
            else if (h.ID == 1) {
                h.area.forEach(a => {
                    this.area[a].addHazard(new Hazard_1.Snape());
                });
            }
            else if (h.ID == 2) {
                h.area.forEach(a => {
                    this.area[a].addHazard(new Hazard_1.Divination());
                });
            }
        });
    }
    parseMonster() {
        this.monster = new Monster_1.Monster(this.area[this.data.monster.area]);
        return this.monster;
    }
    parsePlayer() {
        this.player = new Player_1.Player(this.area[this.data.player.area]);
        return this.player;
    }
}
exports.JsonLoader = JsonLoader;
//# sourceMappingURL=JsonLoader.js.map