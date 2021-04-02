var firebaseConfig = {
    apiKey: "AIzaSyAtnCtP3ddGv3y_AC-tM3OSQAFeY7N3Auw",
    authDomain: "kwitter-final-database.firebaseapp.com",
    databaseURL: "https://kwitter-final-database-default-rtdb.firebaseio.com",
    projectId: "kwitter-final-database",
    storageBucket: "kwitter-final-database.appspot.com",
    messagingSenderId: "407535264076",
    appId: "1:407535264076:web:d4f09d09a060ef2c86efe9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                user_name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function send() {
    msg = document.getElementById("msg").value;
    console.log(room_name);
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function updateLike(message_id) {
    console.log("Clicked on like button- " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_like = Number(likes) + 1;
    console.log(updated_like);

    firebase.database().ref(room_name).child(message_id).update({
        like: updated_like
    });

}