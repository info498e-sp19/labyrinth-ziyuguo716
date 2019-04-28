export interface IHazard{
    name: string
    sayHi()
    printFail()
}

export class Cliff implements IHazard{
    constructor(){}
    name = 'cliff'
    sayHi(){
        console.log('A huge deep cliff ahead!')
    }
    printFail(){
        console.log('It\'s too wide to jump over! You will fall down the cliff!')
    }
}

export class Snape implements IHazard{
    name = 'Snape'
    sayHi(){
        console.log('Professor Snape is standing in front of you with an agry face. The Goblet of Fire is just behind him!!')
    }
    printFail(){
        console.log('Professor doesn\'t give you any chance to approach the Goblet')
    }
}

export class Divination implements IHazard{
    constructor(){}
    name = 'Divination'
    sayHi(){
        console.log('Professor Sybill Trelawney is having a divination class.')
    }
    printFail(){
        console.log('Professor Trelawney won\'t let you go if you do not bring your own crystal ball')
    }
}