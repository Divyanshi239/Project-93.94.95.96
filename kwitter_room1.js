var firebaseConfig = {
      apiKey: "AIzaSyAtnCtP3ddGv3y_AC-tM3OSQAFeY7N3Auw",
      authDomain: "kwitter-final-database.firebaseapp.com",
      databaseURL: "https://kwitter-final-database-default-rtdb.firebaseio.com",
      projectId: "kwitter-final-database",
      storageBucket: "kwitter-final-database.appspot.com",
      messagingSenderId: "407535264076",
      appId: "1:407535264076:web:a8484520d1b9003986efe9"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
console.log(user_name);
document.getElementById("user_name").innerHTML = "Welcome! " + user_name;

function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update(
            {
                  purpose: "adding Room Name"
            }
      );
      localStorage.setItem("room_name", room_name);
      console.log("addRoom");
      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value',
            function (snapshot) {
                  document.getElementById("output").innerHTML =
                  ""; snapshot.forEach(function (childSnapshot) {
                        childKey =
                        childSnapshot.key;
                        Room_names = childKey;
                        //Start code
                        console.log("Room Name - " + Room_names);
                        row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                        document.getElementById("output").innerHTML += row;
                        //End code
                  });
            });
}
getData();

function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
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