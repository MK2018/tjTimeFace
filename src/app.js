/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Clock = require('clock');

var d = new Date();

var day = parseInt(d.getDay());

var nextTime = Clock.weekday(day, 20, 38);
var date = (parseInt(nextTime - (Date.now()/1000))/60)+1;

var window = new UI.Window({
  fullscreen: true,
});


// Create a background Rect
var bgRect = new UI.Rect({
  position: new Vector2(0, 0),
  size: new Vector2(144, 120),
  backgroundColor: 'white'
});
window.add(bgRect);


// Create TimeText
var timeText = new UI.TimeText({
  position: new Vector2(0, 2),
  size: new Vector2(144, 30),
  text: "%I:%M %p\n%a %b %d",
  font: 'gothic-28-bold',
  color: 'black',
  textAlign: 'center'
});

var timeLeft = new UI.TimeText({
  position: new Vector2(0, 130),
  size: new Vector2(144, 30),
  text: "Time left: " + parseInt(date),
  color: 'white',
  textAlign: 'center',
});

window.add(timeLeft);

// Add the TimeText
window.add(timeText);

// Show the Window
window.show();

var xhrRequest = function (url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
};

function fetchSchedule(){
  var url = "http://www.tjtimelib.appspot.com";
  xhrRequest(url, 'GET', 
    function(responseText) {
      // responseText contains a JSON object with weather info
      var jsonObj = JSON.parse(responseText);
      var jsonTxt = JSON.stringify(jsonObj);
      console.log(jsonTxt);
      console.log(JSON.stringify(jsonObj[0].start));
    }      
  );
}

fetchSchedule();

function start(){
  date = (parseInt(nextTime - (Date.now()/1000))/60)+1;
  timeLeft.text(parseInt(date) + " min left");
  window.add(timeLeft);
  window.show();
  setTimeout(start, 5000);
}

start();

/*main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});*/

/*main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    //font: 'gothic-24-bold',
    text: 'Loading...',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

/*main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});*/
