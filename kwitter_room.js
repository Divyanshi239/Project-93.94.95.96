var firebaseConfig = {
    apiKey: "AIzaSyCjT6k39OJeLk7y5MeHTd8BPLxTiYkz0i4",
    authDomain: "let-schatwebsite.firebaseapp.com",
    projectId: "let-schatwebsite",
    storageBucket: "let-schatwebsite.appspot.com",
    messagingSenderId: "921304359282",
    appId: "1:921304359282:web:03af257ba5b783ee307deb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
console.log(user_name);
document.getElementById("user_name").innerHTML = "Welcome! " + user_name;

function addRoom()
{
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

function getData() {firebase.database().ref("/").on('value',
function(snapshot) {document.getElementById("output").innerHTML =
"";snapshot.forEach(function(childSnapshot) {childKey =
childSnapshot.key;
 Room_names = childKey;
 //Start code
 console.log("Room Name - " + Room_names);
       row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
       document.getElementById("output").innerHTML += row;
 //End code
 });});}
getData();

function logout()
{
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}