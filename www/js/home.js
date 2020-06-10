
var glodalList =[];
var storage = window.localStorage;

var app = {
    // Application varructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    


    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var listeneing = document.querySelector(".listening");
        listeneing.innerHTML="loaded device";
        listeneing.style.display="none";
          
   var assigned = [];


  

    var main = document.querySelector('.mainContent');
    
    var error = document.querySelector('.error');

    var profile = document.querySelector('.Profile');

    var firebaseConfig = {
apiKey: "AIzaSyDNaNRZSLk96eHP9_4JQ7HYubpCnVq8IAc",
authDomain: "bicycle-app-f3005.firebaseapp.com",
databaseURL: "https://bicycle-app-f3005.firebaseio.com",
projectId: "bicycle-app-f3005",
storageBucket: "bicycle-app-f3005.appspot.com",
messagingSenderId: "19986827976",
appId: "1:19986827976:web:41f47defbff90c481b33fd"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var cycles = [];
var newCardList;
"use strict";
db.collection("All")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            cycles.push(doc);
        });
       
        console.log(cycles);
       
        var cardList = cycles.map((data,ind) =>{
             glodalList.push({
                img:data.data().img,
                name:data.id,
                id:ind
            });
            storage.setItem("AllList",JSON.stringify( glodalList));
            console.log("glodalList is", glodalList);
            return `
            <ion-card>
  <ion-card-header>
    <ion-card-subtitle>$78</ion-card-subtitle>
    <ion-card-title>${data.id}</ion-card-title>
  </ion-card-header>
   <img src = ${data.data().img}>
   <div style="text-align: center">
   <button onclick="handleAssign(event)" value =${ind} id=a-${ind} style=" height:40px; width:80px; padding:5px; font-size:16px; color:white;background-color:dodgerblue;"> Assign</button>
   <button onclick="handleUnAssign(event)"  id=ua-${ind} style=" height:40px; width:80px; padding:5px; font-size:16px; color:white;background-color:#E74E36 ;display:none"> Unassign</button>
   </div>
   </ion-card>
            `
        }).join(" ");
        main.innerHTML = cardList;
        newCardList = cardList;
        var mainSpinner = document.querySelector("#mainSpinner");
        mainSpinner.style.display = "none";
    })
    .catch(function(err) {
        console.log("Error getting documents: ", err);
        error.innerHTML = err;
    });


    var segments = document.querySelectorAll('ion-segment');
    
    var storage = window.localStorage;
    var profileCard = `
    
    <ion-card>
       <ion-row>
        <ion-col size="3">
            <ion-avatar class="ion-margin-start">
           <img src="img/avatar.svg">
           </ion-avatar>
        </ion-col>
       
        <ion-col>
  <ion-card-header>
    <ion-card-subtitle>${storage.getItem("UserEmail")}</ion-card-subtitle>
    <ion-card-title>${storage.getItem("UserName")}</ion-card-title>
    <a href="index.html" style="z-index:1">
    <ion-button>Signout</ion-button></a>
  </ion-card-header>
   
  <ion-card-content>
    
     No cycle assigned
  </ion-card-content>
  </ion-col>
 
</ion-row>

</ion-card>
    `;
for (var i = 0; i < segments.length; i++) {
  segments[i].addEventListener('ionChange', (ev) => {
    if( ev.detail.value==="profile"){
        main.innerHTML = "";
        main.innerHTML = profileCard;
    }else {
        profile.innerHTML = "";
        main.innerHTML = newCardList;}
    
  })
}

        console.log('Received Event: ' + id);
    }
    
};

app.initialize();
