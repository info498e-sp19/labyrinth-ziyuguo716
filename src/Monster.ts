import {Area} from './Area'

export class Monster{
    private name = 'dementor'
    private itemName = 'Spell Scroll'
    private isAtEast: boolean;
    private isDead: boolean = false;
    constructor(private currArea: Area){
        this.isAtEast=true;
    }

    public setIsDead(isKilled: boolean){
        this.isDead=isKilled;
    }

    public checkMonsterIsDead(){
        return this.isDead;
    }

    public getCurrArea(){
        return this.currArea;
    }
    
    public getName(){
        return this.name;
    }
    public sayHi(){
        console.log('Oh crap! You run into a Dementor!!!')
        console.log('USE the Spell Scroll immediately if you have one!')
    }
    public printFail(){
        console.log('You failed to use secret spell from a scroll to defeat Dementor!')
    }
    public getItemName(){
        return this.itemName;
    }
    public wander(){
        if (!this.isDead){
            if(this.isAtEast){
                this.move('west')
                this.isAtEast=false;
            }else{
                this.move('east')
                this.isAtEast=true;
            }
        }else {
            return;
        }

    }
    private move(direction: string): void {
        let nextMove = this.currArea.getDir();

        nextMove.forEach(x => {
            if (x===direction){
                this.currArea.removeMonster();
                let idx = nextMove.indexOf(x);
                let nextArea = this.currArea.getNextArea()[idx];
                
                this.currArea = nextArea;
                this.currArea.addMonster(this);
            } 
        });
    }
}