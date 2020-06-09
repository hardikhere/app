/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
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
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
       
        var main = document.querySelector('.mainContent');
        var profile = document.querySelector('.Profile');
    
        const firebaseConfig = {
    apiKey: "AIzaSyDNaNRZSLk96eHP9_4JQ7HYubpCnVq8IAc",
    authDomain: "bicycle-app-f3005.firebaseapp.com",
    databaseURL: "https://bicycle-app-f3005.firebaseio.com",
    projectId: "bicycle-app-f3005",
    storageBucket: "bicycle-app-f3005.appspot.com",
    messagingSenderId: "19986827976",
    appId: "1:19986827976:web:41f47defbff90c481b33fd"
    };
    //firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const cycles = [];
    var newCardList;
    
    db.collection("All")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                cycles.push(doc.data());
            });
            console.log(cycles);
            var cardList = cycles.map(data =>{
                return `
                <ion-card>
      <ion-card-header>
        <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        <ion-card-title>Card Title</ion-card-title>
      </ion-card-header>
       <img src = ${data.img}>
    </ion-card>
                `
            }).join(" ");
            main.innerHTML = cardList;
            newCardList = cardList;
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    
    
        const segments = document.querySelectorAll('ion-segment');
        
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
      </ion-card-header>
    
      <ion-card-content>
         No cycle assigned
      </ion-card-content>
      </ion-col>
    </ion-row>
    </ion-card>
        `;
    for (let i = 0; i < segments.length; i++) {
      segments[i].addEventListener('ionChange', (ev) => {
        if( ev.detail.value==="profile"){
            main.innerHTML = "";
            profile.innerHTML = profileCard;
        }else {
            profile.innerHTML = "";
            main.innerHTML = newCardList;}
        
      })
    }
    

        console.log('Received Event: ' + id);
    }
};

app.initialize();