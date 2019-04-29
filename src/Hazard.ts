export interface IHazard{
    getName(): string
    sayHi(): void
    printFail(): void
}

export class Cliff implements IHazard{
    constructor(){}
    private name = 'cliff'
    
    public getName(){
        return this.name;
    }
    public sayHi(){
        console.log('A huge deep cliff ahead!')
    }
    public printFail(){
        console.log('It\'s too wide to jump over! You will fall down the cliff!')
    }
}

export class Snape implements IHazard{
    constructor(){}
    private name = 'snape'
    
    public getName(){
        return this.name;
    }
    public sayHi(){
        console.log('Professor Snape is standing in front of you with an agry face. The Goblet of Fire is just behind him!!')
    }
    public printFail(){
        console.log('Professor doesn\'t give you any chance to approach the Goblet')
    }
}

export class Divination implements IHazard{
    constructor(){}
    private name = 'divination'

    public getName(){
        return this.name;
    }
    public sayHi(){
        console.log('Professor Sybill Trelawney is having a divination class.')
    }
    public printFail(){
        console.log('Professor Trelawney won\'t let you go if you do not bring your own crystal ball')
    }
}