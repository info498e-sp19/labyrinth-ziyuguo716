import { Area } from './Area'

export class Monster {
    private name = 'dementor'
    private itemName = 'Spell Scroll'
    private isAtEast: boolean;
    private isDead: boolean;
    constructor(private currArea: Area) {
        this.isAtEast = true;
        this.isDead = false;
    }

    public getCurrArea() {
        return this.currArea;
    }

    public getItemName() {
        return this.itemName;
    }

    public getName() {
        return this.name;
    }

    public checkMonsterIsDead() {
        return this.isDead;
    }

    public setIsDead() {
        this.isDead = true;
    }

    public sayHi() {
        console.log('Oh crap! You run into a Dementor!!!')
        console.log('USE the Spell Scroll immediately if you have one!')
    }

    public printFail() {
        console.log('You failed to use secret spell from a scroll to defeat Dementor!')
    }

    // Monster is set to be wandering between two areas: East(Locaiton(0,2)) and West(Location(0,1))
    public wander() {
        if (!this.isDead) {
            if (this.isAtEast) {
                this.move('west')
                this.isAtEast = false;
            } else {
                this.move('east')
                this.isAtEast = true;
            }
        } else {
            return;
        }
    }

    private move(direction: string): void {
        let nextMove = this.currArea.getDir();

        nextMove.forEach(x => {
            if (x === direction) {
                this.currArea.removeMonster();
                let idx = nextMove.indexOf(x);
                let nextArea = this.currArea.getNextArea()[idx];

                this.currArea = nextArea;
                this.currArea.addMonster(this);
            }
        });
    }
}