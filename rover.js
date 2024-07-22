const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
    let messageObject = {
      message: message.name,
      results: [],
    }

    for (let i = 0; i < message.commands.length; i++) {
      let currentCommand = message.commands[i];
      if (currentCommand.commandType === 'MOVE') {

        if(this.mode === 'NORMAL'){
          this.position = currentCommand.value;
          messageObject.results.push({ completed: true })

        }else if(this.mode === 'LOW_POWER'){
          messageObject.results.push({ completed: false })
        }
       
      }

    
      if (currentCommand.commandType === 'STATUS_CHECK') {
        messageObject.results.push({
           completed: true, 
            roverStatus:
             { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position } 
          });
      }

    
      if (currentCommand.commandType === 'MODE_CHANGE') {
        this.mode = currentCommand.value;
        messageObject.results.push({ completed: true })
      }
    }
    return messageObject;
  }
}


module.exports = Rover;

