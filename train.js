


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB5Gvx-Kt-Ahd73uX1OB9iyik-3F1LD0oY",
    authDomain: "train-time-38e47.firebaseapp.com",
    databaseURL: "https://train-time-38e47.firebaseio.com",
    projectId: "train-time-38e47",
    storageBucket: "train-time-38e47.appspot.com",
    messagingSenderId: "1094816055553",
    appId: "1:1094816055553:web:bc329456c1abd371"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var trainname = "";
  var destination = "";
  var firsttime = "";
  var frequency = "";

  $("#addtrain").on("click", function(event){
      event.preventDefault();

      trainname = $("#train-input").val().trim();
      destination = $("#destination-input").val().trim();
      firsttime = $("#firsttrain-input").val().trim();
      frequency = $("#frequency-input").val().trim();

    database.ref().push({
        trainname: trainname,
        destination: destination,
        firsttime: firsttime,
        frequency: frequency,
    });


  });

  database.ref().on("child_added", function(childSanpshot) {

    trainname = childSanpshot.val().trainname;
    destination = childSanpshot.val().destination;
    firsttime = childSanpshot.val().firsttime;
    frequency = childSanpshot.val().frequency;

    console.log("firsttime " + firsttime);
    var firsttimeMoment = moment(firsttime, "HH:mm");
    console.log(firsttimeMoment + "firstmoment is " + firsttimeMoment.isValid());
    var currenttime = moment();
    console.log(currenttime);
    var minuteArrival = currenttime.diff(firsttimeMoment, 'minutes');
    var minuteLast = minuteArrival % frequency;
    console.log("minuteArrival " + minuteArrival + " frequency " + frequency);
    var awayTrain = frequency - minuteLast;

    console.log("away train = " + awayTrain + " frequency " + frequency + " minuteLast " + minuteLast)
    var nextArrival = currenttime.add(awayTrain/*, 'minutes'*/);
    console.log(nextArrival + " next " + currenttime + " current " + awayTrain + " away");
    var arrivaltime = nextArrival.format("HH:mm");

    $("#AddTrain").append("<tr><td>" + trainname + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + awayTrain + "</td>");


  });