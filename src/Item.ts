export interface IItem {
    printSuccess(): void;
    printFail(): void;
    sayHi(): void;
    getName(): string;
}

export class FlyingBroom implements IItem {
    private name: string = 'Flying Broom'
    constructor() {
    }

    public sayHi():void {
        console.log('There is a Flying Broom on the floor')
    }
    public getName() {
        return this.name;
    }
    public printSuccess() {
        console.log('You ride the flying broom over the cliff.')
    }
    public printFail() {
        console.log('You ride the flying broom around and fly back to where you started. You wasted the broom.')
    }
}

export class InvisibleCloak implements IItem {
    private name: string = 'Cloak of Invisibility'
    constructor() { }

    public sayHi() {
        console.log('There is a Cloak of Invisibility hanging on the wall')
    }
    public getName() {
        return this.name;
    }
    public printSuccess() {
        console.log('You put on the Cloak of Invisibility and go invisible.')
        console.log('Prof. Snape cannot see you now and you have a chance to get the Goblet of Fire!')
    }
    public printFail() {
        console.log('You put on the Cloak of Invisibility. But there is nobody around you. You wasted it.')
    }
}

export class CrystalBall implements IItem {
    private name: string = 'Crystal Ball'
    constructor() { }

    public sayHi() {
        console.log('There is a Crystal Ball behind the door.')
    }
    public getName() {
        return this.name;
    }
    public printSuccess() {
        console.log('You use the crystal ball in the Divination class and pass the exam.')
    }
    public printFail() {
        console.log('You used the crystal ball but nothing happens. You wasted the crystal.')
    }
}

export class SpellScroll implements IItem {
    private name: string = 'Spell Scroll'
    constructor() { }

    public sayHi() {
        console.log('There is a Spell Scroll on the floor.')
    }
    public getName() {
        return this.name;
    }
    public printSuccess() {
        console.log('Expecto Patronum!!!!')
        console.log('You use the magic spell that you read from the scroll and summon a Patronus Charm!!')
        console.log('The Demontor is killed by your Patronus Charm! You can move on!.')
    }
    public printFail() {
        console.log('You use the magic spell but there is no Demontor around. You wasted the spell.')
    }
}

export class Goblet implements IItem {
    private name: string = 'Goblet of Fire'
    constructor() { }

    public sayHi() {
        console.log('The Goblet of Fire is just behind Snape!!')
    }
    public getName() {
        return this.name;
    }
    public printSuccess() {
        console.log('You successfully took the Goblet of Fire! Bring it to professor Dumbledore!')
    }
    public printFail() {
        console.log('You used the Goblet but nothing happened. You have to bring it to professor Dumbledore!!!')
    }
}
