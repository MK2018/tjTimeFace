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
  size: new Vector2(144, 80),
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

var timeLeft = new UI.Text({
  position: new Vector2(0, 112),
  size: new Vector2(144, 30),
  text: "Loading...",
  font: 'gothic-24',
  color: 'white',
  textAlign: 'center',
});

var weather = new UI.Text({
  position: new Vector2(100, 75),
  size: new Vector2(44, 30),
  text: "32.0",
  font: 'gothic-24',
  color: 'white',
  textAlign: 'center',
});

var back_image = new UI.Image({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  backgroundColor: 'clear',
  image: 'images/tjTimeBack.png',
});

window.add(back_image);

window.add(weather);

window.add(timeLeft);

// Add the TimeText
window.add(timeText);

// Show the Window
window.show();

function getMinSinceMidnight(d) {
  var e = new Date(d);
  return ((d - e.setHours(0,0,0,0))/1000)/60;
}

function analyzeTime(jsonObj){
  for(var i = 1; i <= parseInt(jsonObj[0]); i++){
    console.log("Current time: " + parseInt(getMinSinceMidnight(new Date())));
    console.log("start time: " + parseInt(JSON.stringify(jsonObj[2].startInt)));
    if(parseInt(JSON.stringify(jsonObj[i].endInt))>parseInt(getMinSinceMidnight(new Date()))&&parseInt(JSON.stringify(jsonObj[i].startInt))<parseInt(getMinSinceMidnight(new Date()))){
      //console.log(JSON.stringify(jsonObj[i].name)+" is in progess");
      return JSON.stringify(jsonObj[i].name)+"\n"+JSON.stringify(jsonObj[i].startForm)+ " - " +JSON.stringify(jsonObj[i].endForm);
    }     
  }
  return "No class right now. Enjoy!";
}

//console.log(getMinSinceMidnight(new Date()));

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
      /*var jsonTxt = JSON.stringify(jsonObj);
      console.log(jsonTxt);
      console.log("array length" + jsonObj.length);
      console.log(JSON.stringify(jsonObj[0].start));*/
      var timeAnalysis = analyzeTime(jsonObj);
      //var toPrint = JSON.stringify(jsonObj[1].name)+"\n"+JSON.stringify(jsonObj[1].startForm)+ " - " +JSON.stringify(jsonObj[1].endForm);
      //toPrint = toPrint.replace(/\"/g, "");
      timeLeft.text(timeAnalysis.replace(/\"/g, ""));
    }      
  );
}

fetchSchedule();

function start(){
  fetchSchedule();
  date = (parseInt(nextTime - (Date.now()/1000))/60)+1;
  //timeLeft.text(parseInt(date) + " min left");
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
