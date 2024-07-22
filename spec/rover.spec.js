const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {

  it("constructor sets position and default values for mode and generatorWatts", function () {
    let newRover = new Rover(110, 'NORMAL', 110);
    expect(newRover.position).toBe(110);
    expect(newRover.mode).toBe('NORMAL');
    expect(newRover.generatorWatts).toBe(110);
  });


  it("response returned by recieveMessage contains the name of the message", function () {
    let newRover = new Rover(110, 'NORMAL', 110);
    let messageOne = new Message("Stacey's Test", []);
    let response = newRover.receiveMessage(messageOne);
    expect(response.message).toBe("Stacey's Test");
  });


  it("response returned by recieveMessage includes two results if two commands are sent in the message", function () {
  let newRover = new Rover(110, 'NORMAL', 110);
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let messageOne = new Message("Stacey's Test", commands);
  let response = newRover.receiveMessage(messageOne);
  let length = response.results.length;
  expect(length).toEqual(2);
 });


 it("responds correctly to the status check command", function () {
   let roverStatus = new Rover(87382098, 'NORMAL', 110);
   let commands = [new Command('STATUS_CHECK')];
   let messageTwo = new Message("Stacey's Test", commands);
  let responseOne = roverStatus.receiveMessage(messageTwo);
  let length = responseOne.results.length;
  expect(responseOne.results[0]).toStrictEqual({
    completed: true,
     roverStatus: {position: 87382098, mode: 'NORMAL', generatorWatts: 110}
    })
});


it("responds correctly to the mode change command", function (){
  let roverStatus = new Rover(87382098, 'LOW_POWER', 110);
  let commands = [new Command('MODE_CHANGE', 'NORMAL')];
  let messageTwo = new Message("Stacey's Test", commands);
  let responseOne = roverStatus.receiveMessage(messageTwo);
  expect(responseOne.results[0].completed).toEqual(true);
});

//TEST 12//
it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
  let roverStatus = new Rover(87382098, 'NORMAL', 110);
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12000)];
  let messageOne = new Message("Stacey's Test", commands);
  let response = roverStatus.receiveMessage(messageOne);
  expect(response.results[0].completed).toEqual(true);

  expect(response.results[1].completed).toEqual(false);
});


//TEST 13//
it("responds with the position for the move command", function() {
let commands = [new Command('MOVE', 12000), new Command('STATUS_CHECK')];
let messageTwo = new Message("STacey's Test", commands);
let rover = new Rover(99999);
let responseOne = rover.receiveMessage(messageTwo);
expect(responseOne.results[0].completed).toBe(true);
expect(responseOne.results[1].roverStatus.position).toBe(12000);
});
});