import {Command, CommandParser} from './Parser';
import { Area } from './Area';
import {Location} from './Location'
import {IHazard, Divination, Cliff,Snape} from './Hazard'
import {IItem, FlyingBroom, InvisibleCloak, CrystalBall, SpellScroll,Goblet} from './Item'
import { Player } from './Player';
import { Monster } from './Monster';

//an example input handler function
function handleInput(cmd:Command, arg:string):boolean {
  //the arguments are the command and "arguments" the user has entered
  console.log("Handling", cmd, "with argument '"+arg+"'");

  //an example of handling a particular input
  if(cmd === Command.GO){ 
    if(!player.checkIsTrapped()){
      monster.wander();
    }
    player.move(arg);
    if(player.checkPlayerIsDead()){
      return false;
    }
    if(player.isWinner()){
      return false;
    } 
  } else if (cmd === Command.TAKE){
      if (player.getCurrArea().hasItem(arg)){
        player.takeItem(player.getCurrArea().getItem());
      } else {
        console.log('You cannot take ' + arg);
      }
  } else if (cmd === Command.USE) {
      player.useItem(arg);
  } else if (cmd === Command.INVENTORY) {
      player.printInventory();
  } else if (cmd === Command.LOOK){
      player.look();
  }

  return true; //return true to indicate that it should prompt for another input
}




let area00 = new Area('Slytherin Dungeon','You are at Slytherin Dungeon',
new Location(0,0), new Goblet(), new Snape())

let area01 = new Area('Divination Classroom', 'You are at the divination classroom',
new Location(0,1),undefined, new Divination())

let area02 = new Area('Dumbledore Office','Dumbledore is waiting for you to bring the Goblet',
new Location(0,2))

let area10 = new Area('Hospital Wing','You are at the Hospital Wing.',
new Location(1,0), new InvisibleCloak())

let area11 = new Area('Gryffindor Common Room', 'You are at the start point: Gryffindor Common Room',
new Location(1,1))

let area12 = new Area('Disused Classroom','You are at Disused Classroom',
new Location(1,2), new SpellScroll())

let area20 = new Area('Forbidden Forest','You are at the Forbidden Forest',
new Location(2,0),undefined, new Cliff())

let area21 = new Area('Storage Room','You are at Storage Room',
new Location(2,1), new FlyingBroom())

let area22 = new Area('Trophy Room','You are at Trophy Room',
new Location(2,2), new CrystalBall())

area00.setAdjArea([area01, area10])
area01.setAdjArea([area00, area02])
area02.setAdjArea([area01, area12])
area10.setAdjArea([area00, area20])
area11.setAdjArea([area12, area21])
area12.setAdjArea([area02, area11, area22])
area20.setAdjArea([area10, area21])
area21.setAdjArea([area11, area20, area22])
area22.setAdjArea([area21, area12])


let player = new Player(area11)
let monster = new Monster(area02)

//an example of using the CommandParser
let parser = new CommandParser(handleInput); //pass in the "handler" callback
console.log('Input a command:')

parser.start();