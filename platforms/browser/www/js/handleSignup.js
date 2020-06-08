var ids = {
    email: document.querySelector("#email"),
    password:document.querySelector("#password"),
    signupbtn:document.querySelector(".signupbtn")
};


const handleSubmit = (e)=>{
    e.preventDefault();
    const email = ids.email.value;
    const pass = ids.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(user=>{
        console.log(user);
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
        // ...
      });
};