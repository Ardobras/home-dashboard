var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

class Widget {
  constructor(name, settings) {
    this.name = name;
    this.settings = settings;
    this.instance = require(`./widgets/${this.name}`);
    this.instance.init(this.settings);
  }

  run(send) {
    var CronJob = require('cron').CronJob;
    new CronJob(this.settings.cronPattern, () => {
      send('weather', {
        latitude: 55.5893918,
        longitude: 13.0182893,
        timezone: 'Europe/Stockholm',
        offset: 1,
        currently: {
          time: 1484171221,
          summary: 'Nieselregen',
          icon: 'rain',
          precipIntensity: 0.2413,
          precipProbability: 0.43,
          precipType: 'rain',
          temperature: 2.17,
          apparentTemperature: -3.52,
          dewPoint: 0.53,
          humidity: 0.89,
          windSpeed: 28.86,
          windBearing: 262,
          cloudCover: 0.52,
          pressure: 986.68,
          ozone: 336.91
        }
      });
      /*
      this.instance.run().then(data => {
        send(this.name, data);
        console.log(data)
      });
      */
    }, null, true, 'Europe/Stockholm');
  }
}

var weather = new Widget('weather',{
  cronPattern: '*/5 * * * * *',
  lat: '55.5893918',
  long: '13.0182893'
});

weather.run(sendThroughSocket);

app.use('/', express.static('frontend'));

io.on('connection', function(socket){
  console.log('a user connected');
  weather.run(sendThroughSocket);
});

function sendThroughSocket(name, data) {
  io.emit(name, data);
}

http.listen(3001, function(){
  console.log('listening on *:3000');
});