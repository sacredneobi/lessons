const { EventEmitter } = require("events");

class MyEvents extends EventEmitter {}

const rootEvents = new MyEvents();

process.rootEvents = rootEvents;

module.exports = rootEvents;
