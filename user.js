// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDJpvXSBjE5qacxldwQm0uHvKmtSUQYq0I",
  authDomain: "signup-30158.firebaseapp.com",
  projectId: "signup-30158",
  storageBucket: "signup-30158.appspot.com",
  messagingSenderId: "1038429168102",
  appId: "1:1038429168102:web:2b5994c6a8c4fdc05a7627"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()
var recorder_opt = "some value";
// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  pNumber = document.getElementById('pNumber').value
  address = document.getElementById('address').value
  intrest = document.getElementById('intrest').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false || validate_field(pNumber) == false || validate_field(address) == false || validate_field(intrest) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      address : address,
      intrest : intrest,
      pNumber: pNumber,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
   })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}


// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}