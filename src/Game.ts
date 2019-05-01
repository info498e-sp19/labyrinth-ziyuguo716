import { Command, CommandParser } from './Parser';
import { Area } from './Area';
import { Player } from './Player';
import { JsonLoader } from './JsonLoader';
import { Monster } from './Monster';

export class Game{
    private jsonloader = new JsonLoader()

    private area:Area[] = this.jsonloader.parseArea()
    private player:Player = this.jsonloader.parsePlayer()
    private monster:Monster = this.jsonloader.parseMonster()

    constructor(){
        this.jsonloader.parseItem()
        this.jsonloader.parseHazard()
    }

    public play(){
        console.log("@@@@@@@@@@@ Harry Porter Labyrinth @@@@@@@@@@@");
        console.log("Welcome to the magic world of Harry Porter!!");
        console.log("What you need to do is to find the Goblet of Fire and bring it to professor Dumbledore");
        console.log("Use items to get over hazards! And prepare to fight with the dementor!");
        console.log("Go young wizard! Good luck!");
        console.log('')

        this.player.getCurrArea().sayHi();
        console.log('')
        console.log('What would you like to do?')

        let parser = new CommandParser(this.handleInput)
        parser.start();
    }

    private handleInput(cmd: Command, arg: string): boolean {
        console.log("@@@@@@@@@@@ Harry Porter Labyrinth @@@@@@@@@@@");
        
        if (!this.player.checkIsTrapped()) { 
          //if player is entangled with monster, 
          //monster does not move until player takes an action
          this.monster.wander();
        }
      
        if (cmd === Command.GO) {
          this.player.move(arg);
        } else if (cmd === Command.TAKE) {
          if (this.player.getCurrArea().hasItem(arg)) {
            this.player.takeItem(this.player.getCurrArea().getItem());
          } else {
            console.log('You cannot take ' + arg);
          }
        } else if (cmd === Command.USE) {
          this.player.useItem(arg);
        } else if (cmd === Command.INVENTORY) {
          this.player.printInventory();
        } else if (cmd === Command.LOOK) {
          this.player.look();
        }
      
        if (this.player.checkPlayerIsDead()) {
          return false;
        }
        if (this.player.isWinner()) {
          return false;
        }
        console.log('')
        console.log('What would you like to do?')
      
        return true; //return true to indicate that it should prompt for another input
      }

}