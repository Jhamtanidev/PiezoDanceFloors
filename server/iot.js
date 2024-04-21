const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const portName = '/dev/ttyACM0'; // Change this to match your Arduino's port

const serialPort = new SerialPort(portName, { baudRate: 9600 });
const parser = serialPort.pipe(new Readline({ delimiter: '\n' }));

app.use(express.static('public'));

parser.on('data', (data) => {
  console.log('Data received from Arduino:', data);
  io.emit('dance', data);
});

http.listen(3000, () => {
  console.log('Server is running on port 3000');
});
