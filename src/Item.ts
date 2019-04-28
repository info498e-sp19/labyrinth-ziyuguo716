export interface IItem {
    printSuccess():void;
    printFail():void;
    getName(): string;
}

export class FlyingBroom implements IItem{
    private name: string = 'Flying Broom'
    constructor(){}

    public sayHi(){
        console.log('There is a Flying Broom on the floor')
    }
    public getName(){
        return this.name;
    }
    public printSuccess(){
        console.log('You ride the flying broom over the cliff.')
    }
    public printFail(){
        console.log('You ride the flying broom around and fly back to where you started. You wasted the broom.')
    }

}

export class InvisibleCloak implements IItem{
    private name: string = 'Cloak of Invisibility'
    constructor(){}

    public sayHi(){
        console.log('There is a Cloak of Invisibility hanging on the wall')
    }
    public getName(){
        return this.name;
    }
    public printSuccess(){
        console.log('You put on the Cloak of Invisibility and sneak out of the classroom.')
        console.log('Prof. Snape cannot see you because you are invisible now.')
    }
    public printFail(){
        console.log('You put on the Cloak of Invisibility. But there is nobody around you. You wasted it.')
    }
}

export class Crystal implements IItem{
    private name: string = 'Magic Crystal'
    constructor(){}

    public sayHi(){
        console.log('There is a Crystal ')
    }
    public getName(){
        return this.name;
    }
    public printSuccess(){
        console.log('You use the magic crystal in the Divination class and pass the exam.')
    }
    public printFail(){
        console.log('You used the magic crystal but nothing happens. You wasted the crystal.')
    }
}

export class SpellScroll implements IItem{
    private name: string = 'Spell Scroll'
    constructor(){}

    public getName(){
        return this.name;
    }
    public printSuccess(){
        //"Expecto Patronum!"
        console.log('You use the magic spell that you read from the scroll and summon your Patronus Charm')
        console.log('The Demontor is gone.')
    }
    public printFail(){
        console.log('You use the magic spell but there is no Demontor around. You wasted the spell.')
    }
}