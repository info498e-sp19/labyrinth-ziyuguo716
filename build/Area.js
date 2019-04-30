"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Area {
    constructor(name, description, location, item, hazard) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.item = item;
        this.hazard = hazard;
        this.nextArea = [];
        this.dir = [];
        this.isTaken = false;
        this.isClear = false;
        if (this.item == undefined)
            this.isTaken = true;
        if (this.hazard == undefined)
            this.isClear = true;
    }
    hasItem(itemName) {
        return itemName.toUpperCase() === this.item.getName().toUpperCase();
    }
    getName() {
        return this.name;
    }
    getLocation() {
        return this.location;
    }
    getItem() {
        return this.item;
    }
    addItem(item) {
        this.item = item;
        this.isTaken = false;
    }
    addHazard(hazard) {
        this.hazard = hazard;
        this.isClear = false;
    }
    setAdjArea(area) {
        this.nextArea = area;
        area.forEach(a => {
            if (a.getLocation().getX() === this.location.getX()) {
                if (a.getLocation().getY() === this.location.getY() - 1) {
                    this.dir.push('west');
                }
                else if (a.getLocation().getY() === this.location.getY() + 1) {
                    this.dir.push('east');
                }
            }
            else if (a.getLocation().getY() === this.location.getY()) {
                if (a.getLocation().getX() === this.location.getX() - 1) {
                    this.dir.push('north');
                }
                else if (a.getLocation().getX() === this.location.getX() + 1) {
                    this.dir.push('south');
                }
            }
        });
    }
    getDir() {
        return this.dir;
    }
    getNextArea() {
        return this.nextArea;
    }
    getHazard() {
        return this.hazard;
    }
    checkTaken() {
        return this.isTaken;
    }
    checkClear() {
        return this.isClear;
    }
    removeHazard() {
        this.isClear = true;
    }
    removeItem() {
        this.isTaken = true;
    }
    isSameArea(x, y) {
        return this.getLocation().getX() === x && this.getLocation().getY() === y;
    }
    sayHi() {
        console.log(this.getName().toUpperCase());
        console.log(this.description);
        if (!this.isClear) {
            this.hazard.sayHi();
        }
        else {
            this.showNext();
        }
        if (!this.isTaken) {
            this.item.sayHi();
        }
    }
    showNext() {
        console.log("There are doors to the: ");
        this.dir.forEach(d => {
            console.log(d);
        });
    }
}
exports.Area = Area;
//# sourceMappingURL=Area.js.map