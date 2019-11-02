"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Inventory {
    constructor() {
        this.list = [];
    }
    getInventoryList() {
        return this.list;
    }
    add(item) {
        this.list.push(item);
    }
    remove(item) {
        let index = this.list.indexOf(item);
        delete this.list[index];
    }
}
exports.Inventory = Inventory;
//# sourceMappingURL=Inventory.js.map