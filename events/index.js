const { EventEmitter } = require("events");

class MyEvents extends EventEmitter {}

const myEvents = new MyEvents();

process.myEvents = myEvents;

module.exports = myEvents;
