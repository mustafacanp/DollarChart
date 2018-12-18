const express = require('express');
const socket  = require('socket.io');
const axios = require('axios');

const app = express();
const server = app.listen(4000);

app.use(express.static('public'));

const io = socket(server);

let kur = 0;
let currencyData = [];

io.on('connection', function(socket){
  let sendData = {
    'chartData': currencyData,
    'value': currencyData[currencyData.length-1]
  }
  console.log(sendData);
  io.sockets.emit('changeDollar', sendData);
});


setInterval(() => {
  axios.get('https://api.exchangeratesapi.io/latest?base=USD') // TODO: Must find better API, it changes in half an hour
  .then(function (response) {

    let newCurrency = response.data.rates.TRY;
    if(kur !== newCurrency || currencyData.length < 24){

      data = (parseFloat(newCurrency)).toFixed(4);
      currencyData.push(data);
      if(currencyData.length > 24){
        currencyData.shift();
      }
      kur = response.data.rates.TRY;

      let sendData = {
        'chartData': currencyData,
        'value': data
      }
      io.sockets.emit('changeDollar', sendData);
      console.log(sendData);
    }

  }).catch((e) => {
    console.log(e);
  });
}, 2000);
