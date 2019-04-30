
export interface IHazard {
    getName(): string
    getItemName(): string
    sayHi(): void
    printFail(): void
}

export class Cliff implements IHazard {
    constructor() { }
    private name = 'cliff'
    private itemName = 'Flying Broom'

    public getName() {
        return this.name;
    }
    public sayHi() {
        console.log('A huge deep cliff ahead!')
    }
    public printFail() {
        console.log('It\'s too wide to jump over! You will fall down the cliff!')
    }
    public getItemName() {
        return this.itemName;
    }
}

export class Snape implements IHazard {
    constructor() { }
    private name = 'snape'
    private itemName = 'Cloak of Invisibility'

    public getName() {
        return this.name;
    }
    public getItemName() {
        return this.itemName;
    }
    public sayHi() {
        console.log('Professor Snape is standing in front of you with an angry face.')
    }
    public printFail() {
        console.log('Professor doesn\'t give you any chance to approach the Goblet')
    }
}

export class Divination implements IHazard {
    constructor() { }
    private name = 'divination'
    private itemName = 'Crystal Ball'

    public getName() {
        return this.name;
    }
    public getItemName() {
        return this.itemName;
    }
    public sayHi() {
        console.log('Professor Sybill Trelawney is having a divination class.')
    }
    public printFail() {
        console.log('Professor Trelawney won\'t let you go if you do not bring your own crystal ball')
    }
}