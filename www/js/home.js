
var glodalList = [];



var app = {
    // Application varructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },



    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        navigator.splashscreen.show();
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: async function (id) {
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

</ion-col>

</ion-row>

</ion-card>
`;      


       var scheduler = `
       <ion-item>
       <ion-label>Start Time</ion-label>
       <ion-datetime display-format="h:mm A" picker-format="h:mm A" value="1990-02-19T07:43Z"></ion-datetime>
       </ion-item>
       
       `;

        var listeneing = document.querySelector(".listening");
        listeneing.innerHTML = "loaded device";
        listeneing.style.display = "none";

        var main = document.querySelector('.mainContent');

        var error = document.querySelector('.error');

        var profile = document.querySelector('.Profile');

        var firebaseConfig = {
            apiKey: "AIzaSyC7qvTJaOTpkYAkBLgfgvJTI2xjUofr2tE",
            authDomain: "foodplanner-be200.firebaseapp.com",
            databaseURL: "https://foodplanner-be200.firebaseio.com",
            projectId: "foodplanner-be200",
            storageBucket: "foodplanner-be200.appspot.com",
            messagingSenderId: "735315343676",
            appId: "1:735315343676:web:83d367f65d4b40f6b40639"
        };
        firebase.initializeApp(firebaseConfig);

        "use strict";
        var segments = document.querySelectorAll('ion-segment');
        var planner = document.getElementById("planner");
        profile.innerHTML = profileCard;
        for (var i = 0; i < segments.length; i++) {
            segments[i].addEventListener('ionChange', (ev) => {
                if (ev.detail.value === "profile") {
                    profile.style.display = "";
                    planner.style.display = "none";
                } else if (ev.detail.value === "cycles") {
                    main.style.display = "";
                    profile.style.display = "none";
                    planner.style.display = "none";
                }
                else {
                    main.style.display = "none";
                    profile.style.display = "none";
                    planner.style.display = "";
                    planner.innerHTML = scheduler;
                }

            })
        }

        var db = firebase.firestore();
        var loader = document.getElementById("loader");
        loader.style.display = "";
        db.collection("users").where("Email", "==", window.localStorage.getItem("UserEmail"))
            .get()
            .then(snap => {
                var cards = "";
                db.collection("users").doc(snap.docs[0].id).collection("foodPlan").get().then(e => {
                    e.docs.forEach(el => {
                        console.log(el.data());
                        var dayMenu = "";
                        var obj = el.data();
                        for (var pro in obj) {
                            dayMenu += `${pro.toString()}--${obj[pro].map(el => el)}`
                        }
                        cards = cards + `
                      <ion-card>
                        <ion-card-header>
                      <ion-card-title>${el.id}</ion-card-title>
                    </ion-card-header>
                     
                    <ion-card-content>
                       ${dayMenu

                            }
                    </ion-card-content>
                  </ion-card>
                    `;
                    })
                    main.innerHTML = cards;
                    loader.style.display = "none";
                })

            })



    }

};

app.initialize();
