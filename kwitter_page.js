var firebaseConfig = {
  apiKey: "AIzaSyAoPzNUVtveu8k6LxJXI960nW81TXtev8Q",
  authDomain: "kwitter-88fef.firebaseapp.com",
  databaseURL: "https://kwitter-88fef-default-rtdb.firebaseio.com",
  projectId: "kwitter-88fef",
  storageBucket: "kwitter-88fef.appspot.com",
  messagingSenderId: "668697140865",
  appId: "1:668697140865:web:1ca610042dd92ec8b23780"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//YOUR FIRE BASE LINKS

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send()
{
msg = document.getElementById("msg").value;
firebase.database().ref(room_name).push({
name:user_name,
message:msg,
like:0
});

document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
     firebase_message_id = childKey;
     message_data = childData;
//Start code
     name = message_data['name'];
     message= message_data['message'];
     like= message_data['like'];
     name_with_tag= "<h4>"+name+"</h4>";
     message_with_tag= "<h4 class= 'message_h4'>"+message+"</h4>";
     like_button= "<button class= 'btn btn-warning' id="+firebase_message_id+"value="+like+" onclick='updateLike(this.id)'>Likes:"+like+"</button>";
     row= name_with_tag+message_with_tag+like_button;
     document.getElementById("output").innerHTML+=row;  
     //End code
  } });  }); }
getData();

function updateLike(message_id)
{
  button_id=message_id;
  likes=document.getElementById(button_id).value;
  update_Likes=Number(likes)+1;

  firebase.database().ref(room_name).child(message_id).update({
    like:update_Likes
  });
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("kwitter.html")
} 

