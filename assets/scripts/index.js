var name;
var destination;
var firstArrival;
var frequency = 0;
var database;
var trainFirebase;
var newFirebase;
var time;
var clock;

$(document).ready(function(){

 //put running clock function here
 function updateClock() {
  var currentTime = new Date();
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  var currentSeconds = currentTime.getSeconds();
  currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
  currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
  var timeOfDay = (currentHours < 12) ? "AM" : "PM";
  currentHoursAP = (currentHours > 12) ? currentHours - 12 : currentHours;
  currentHoursAP = (currentHoursAP == 0) ? 12 : currentHoursAP;
  var currentTimeString = "Current Time: " + currentHours + ":" + currentMinutes + ":" + currentSeconds + ""
  var nextArr = currentTime.getMinutes() + 5;
  currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
  var nextArr2 = currentTime.getMinutes() + 7;

  $("#orange").html(currentHours + ":" + nextArr);
  $("#silver").html(currentHours + ":" + nextArr);
  $("#blue").html(currentHours + ":" + nextArr2);
  $("#clock").html(currentTimeString);}
  $(document).ready(function () {
  setInterval(updateClock, 1000);

});







var config = {
    apiKey: "AIzaSyCMDYX86YLrZE58yvUPZI81h3o4995MeYM",
    authDomain: "train-times-ea91c.firebaseapp.com",
    databaseURL: "https://train-times-ea91c.firebaseio.com",
    projectId: "train-times-ea91c",
    storageBucket: "train-times-ea91c.appspot.com",
    messagingSenderId: "791645039736",
    appId: "1:791645039736:web:55e7b8136cc2efa5"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submitBtn").on("click", function (event){
    event.preventDefault();
    // console.log("test");

    //grabbing input values
    name = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    firstTrain = $("#firstTrain").val().trim();

    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;



//**Get the next arrival and minutes away. */
    var nextArrival = currentHours + ":" + currentMinutes + " +" + frequency + " minutes";
    var minAway = frequency;


//Dynamically adding inputs to the table
    $("#table-info").append("<tr><td><strong>" + name + "</td></strong>" + "<td>" + destination + "</td>"
     + "<td>" + frequency + "</td>"
     + "<td>" + nextArrival + "</td>"
     + "<td>" + minAway + "</td>", "</tr>");
  
// Pushing user inputs to firebase
    database.ref().push({

      name: name,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    clear();

  });

//Clears the input fields
  function clear(){
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
  
  }


});


