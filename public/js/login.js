// SIGN UP BUTTON FUNCTIONALITY
async function signupFormSubmit(event) {
  event.preventDefault();

const username = document.querySelector('#signup-user').value.trim();
const email = document.querySelector('#signup-email').value.trim();
const github = document.querySelector('#signup-github').value.trim();
const password = document.querySelector('#signup-password').value.trim();

if (username && email && password) {
  const response = await fetch('/api/users', {
    method: 'post',
    body: JSON.stringify({
      username,
      email,
      github,
      password
    }),
    headers: { 'Content-Type': 'application/json' }
  });
    
    if(response.ok) {
      // console.log('success');
      alert("Your Account was created Successfully");
      document.location.replace('/');
      // document.getElementById('signup-form').requestFullscreen()
    } else {
      alert(response.statusText);
    }
  }


};

document.querySelector('#signup-form').addEventListener('submit', signupFormSubmit);


// LOGIN BUTTON FUNCTIONALITY
async function loginFormSubmit(event) {
  event.preventDefault();

  const email = document.querySelector('#login-email').value.trim();
  const password = document.querySelector('#login-password').value.trim();

if (email && password) {
  const response = await fetch('/api/users/login', {
    method: 'post',
    body: JSON.stringify({
      email,
      password
    }),
    headers: { 'Content-Type': 'application/json' }
  });
    
    if(response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormSubmit);



// SHOW THE SIGN UP FORM INSTEAD
// function logInToggle () {
//   document.querySelector('#signup-form-container').classList.toggle('hidden');
//   document.querySelector('#login-form-container').classList.toggle('hidden');
// };

// document.querySelector('.instead').addEventListener('click', logInToggle);