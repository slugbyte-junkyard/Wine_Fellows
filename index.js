  'use strict';

function handleLoginSubmit(event) {
  event.preventDefault();
  var form = event.target;
  var userNameEntry = form.login.value;
  var userFound = false;
  console.log(userNameEntry);
  for (var i = 0; i < users.length && !userFound; i++) {
    if (userNameEntry === users[i].userName) {
      // window.location = '#';
      userFound = true;
      currentUserIndex = i;
      communityReDirect();
      try {
        localStorage.currentUserIndex = JSON.stringify(currentUserIndex);
        console.log('users', users);
      }
      catch (error) {
        console.log('current user index not saved');
      }
      console.log(currentUserIndex);
    } else {
      form.login.placeholder = 'User not found!!!';
      console.log('user not found!');
    }
    form.reset();
  }
}
function signUpHandleSubmit(event) {
  event.preventDefault();
  var form = event.target;
  var firstName= form.firstName.value;
  var lastName= form.lastName.value;
  var userName= form.userName.value;
  var profilePic= form.profilePic.value;
  // profilePic, first, last, userName, wineColor, favWine, favWinery
  var user = new User(profilePic, firstName, lastName, userName);

  var checkbox;
  for (var i = 0; i <wines.length; i++) {
    checkbox = form[wines[i]];
    if (checkbox.checked) {
      user.wineColors.push(checkbox.id)
    }
  }

  for (i = 0; i< wineList.length; i++){
    checkbox = form[wineList[i]];
    if (checkbox.checked) {
      user.favWines.push(checkbox.id)
    }
  }

  for (i = 0; i< wineries.length; i++){
    checkbox = form[wineries[i]];
    if (checkbox.checked) {
      user.favWineries.push(checkbox.id)
    }
  }


  users.push(user);
  try {
    localStorage.users = JSON.stringify(users);
  } catch (error){
    console.log(error);
  }

  currentUserIndex = users.length - 1 ;
  console.log( 'index', currentUserIndex);
  try {
    localStorage.currentUserIndex = JSON.stringify(currentUserIndex);
  } catch (error){
    console.log(error);
  }

  profileReDirect();
}


//redirects to edit porfile
function profileReDirect() {
  window.location.replace('editprofile.html');
}

function communityReDirect() {
  window.location.replace('community.html');
}

checkBoxGenerator(wines, 'Whats your favorite wine color?', 'favwine');
checkBoxGenerator(wineList, 'What kinds of wines do you like to drink?', 'wineTypes');
checkBoxGenerator(wineries, 'What are your favorites wineries?');

var loginLoad = document.getElementById('login-form');
loginLoad.addEventListener('submit', handleLoginSubmit);

// creates new users from form input
var userGeneratorFormSubmit = document.getElementById('createUser');
userGeneratorFormSubmit.addEventListener('submit', signUpHandleSubmit);
