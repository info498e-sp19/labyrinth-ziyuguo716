"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Area_1 = require("./Area");
const Location_1 = require("./Location");
const Hazard_1 = require("./Hazard");
const Item_1 = require("./Item");
const Player_1 = require("./Player");
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
            if (i.ID == 0)
                this.area[i.area].addItem(new Item_1.FlyingBroom());
            else if (i.ID == 1)
                this.area[i.area].addItem(new Item_1.InvisibleCloak());
            else if (i.ID == 2)
                this.area[i.area].addItem(new Item_1.CrystalBall());
            else if (i.ID == 3)
                this.area[i.area].addItem(new Item_1.SpellScroll());
            else if (i.ID == 4)
                this.area[i.area].addItem(new Item_1.Goblet());
        });
    }
    parseHazard() {
        this.data.hazard.forEach(i => {
            if (i.ID == 0)
                this.area[i.area].addHazard(new Hazard_1.Cliff());
            else if (i.ID == 1)
                this.area[i.area].addHazard(new Hazard_1.Snape());
            else if (i.ID == 2)
                this.area[i.area].addHazard(new Hazard_1.Divination());
        });
    }
    parsePlayer() {
        this.player = new Player_1.Player(this.area[this.data.player.area]);
        return this.player;
    }
}
exports.JsonLoader = JsonLoader;
//# sourceMappingURL=JsonLoader.js.map