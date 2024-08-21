//------------------- Js for register and login -------------------//

// variable button
const btnLogin = document.querySelector('.js-btn-login');
const btnRegister = document.querySelector('.js-btn-register');
const btnRegisterFooter = document.querySelectorAll('.js-btn-registerfooter');
const btnsCancel = document.querySelectorAll('.js-btn-cancel');
const btnCart = document.querySelector('.js-btn-cartshopping');
const btnSiderBar = document.querySelector('.js-btn-sidebar');
const btnClose = document.querySelector('.js-btn-close');
const btnLoginRps = document.querySelector('.js-btn-loginRps');
// variable div
const modal = document.querySelector('.js-modal');
const modalRegister = document.querySelector('.js-modal__register');
const modalLogin = document.querySelector('.js-modal__login');
const modalCartshopping = document.querySelector('.js-modal__cartshopping');
const modalRegisterLogin = document.querySelector('.js-modal__registerlogin');
const modalSiderBar = document.querySelector('.js-modal__sidebar');

function showModalLogin() {
    modal.classList.add('open');
    modalRegister.classList.add('hidden');
    modalCartshopping.classList.add('hidden');
    modalSiderBar.classList.add('hidden');
}

function showModalRegister() {
    modal.classList.add('open')
    modalLogin.classList.add('hidden');
    modalCartshopping.classList.add('hidden');
    modalSiderBar.classList.add('hidden');
}

function showSidebar() {
    modal.classList.add('open')
    modalRegisterLogin.classList.add('hidden');
    modalCartshopping.classList.add('hidden');
}

function hiddenModal() {
    modal.classList.remove('open')
    modalRegister.classList.remove('hidden');
    modalLogin.classList.remove('hidden');
    modalCartshopping.classList.remove('open');
    modalCartshopping.classList.remove('hidden');
    modalRegisterLogin.classList.remove('hidden');
    modalSiderBar.classList.remove('hidden');
}

function showModalCart() {
    modal.classList.add('open');
    modalCartshopping.classList.add('open');
    modalRegisterLogin.classList.add('hidden');
    modalSiderBar.classList.add('hidden');
}


btnLogin.addEventListener('click', showModalLogin);
btnRegister.addEventListener('click', showModalRegister);
btnRegisterFooter.forEach(function(btn) {
    btn.addEventListener('click', showModalRegister);
});
btnLoginRps.addEventListener('click', function(){
    modalRegisterLogin.classList.remove('hidden');
    showModalLogin();
});

for (const btnCancel of btnsCancel) {
    btnCancel.addEventListener('click', hiddenModal);
}

modal.addEventListener('click', hiddenModal);

modalLogin.addEventListener('click', function(event){
    event.stopPropagation();
})

modalRegister.addEventListener('click', function(event){
    event.stopPropagation();
})

modalCartshopping.addEventListener('click', function(event){
    event.stopPropagation();
})

modalSiderBar.addEventListener('click', function(event){
    event.stopPropagation();
})

btnCart.addEventListener('click', showModalCart);
btnClose.addEventListener('click', hiddenModal);
btnSiderBar.addEventListener('click', showSidebar);

// LOGIN WITH GG 
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

const btnPayment = document.querySelectorAll('.js__summoney--payment');

btnPayment.forEach(function (btn) {
    btn.addEventListener('click', function () {
        window.location = './payment.html';
    })
})

const btnInfoProduct = document.querySelector('.js--infoproduct');
const btnReturnPolicy = document.querySelector('.js--returnpolicy');
const btnStorageInstructions = document.querySelector('.js--storageinstructions');
const containDesProduct = document.querySelector('.des-product');
const containDesReturngoods = document.querySelector('.des-returngoods-maintain');
const containStorageInstructions = document.querySelector('.des-storageinstructions');
const infoDescriptions = document.querySelector('.js--infodes');

const btnBuyNow = document.querySelectorAll('.js--buynow');

btnBuyNow.forEach(function(btn) {
    btn.addEventListener('click', () => {
        window.location = './payment.html';
    });
});




var nameError = document.getElementById('name-error');
var phoneError = document.getElementById('phone-error');
var emailError = document.getElementById('email-error');
var emailErrorLO = document.getElementById('email-errorLO');
var passwrodErrorLO = document.getElementById('password-errorLO');
var passwrodError = document.getElementById('password-error');
var submitError = document.getElementById('submit-error');
var submitErrorLO = document.getElementById('submit-errorLO');

function validateName(){
    var name = document.getElementById('contact-name').value;

    if(name.length == 0){
        nameError.innerHTML = 'Name is required';
        return false;
    }

    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameError.innerHTML = 'name is wrong';
        return false;
    }

    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validatePhone(){
    var phone = document.getElementById('contact-phone').value;

    if(phone.length == 0){
        phoneError.innerHTML = 'Phone is required';
        return false;
    }

    if(phone.length !== 11){
        phoneError.innerHTML = 'Phone should be 11 digits';
        return false;
    }

    if(!phone.match(/^[0-9]{11}$/)){
        phoneError.innerHTML = 'Phone is wrong';
        return false;
    }

    phoneError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateEmail(){
    var email = document.getElementById('contact-email').value;

    if(email.length == 0){
        emailError.innerHTML = 'email is required';
        return false;
    }

    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        emailError.innerHTML = 'email is wrong';
        return false;
    }

    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateEmailLO(){
    var email = document.getElementById('contact-emailLO').value;

    if(email.length == 0){
        emailErrorLO.innerHTML = 'email is required';
        return false;
    }

    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        emailErrorLO.innerHTML = 'email is wrong';
        return false;
    }

    emailErrorLO.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validatePassword(){
    var passwrod = document.getElementById('contact-password').value;

    if(passwrod.length == 0){
        passwrodError.innerHTML = 'Password is required';
        return false;
    }

    if(passwrod.length <= 8){
        passwrodError.innerHTML = 'Password should be 8 digits or more';
        return false;
    }


    if(!passwrod.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
        passwrodError.innerHTML = 'Password is wrong';
        return false;
    }

    passwrodError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validatePasswordLO(){
    var passwrod = document.getElementById('contact-passwordLO').value;

    if(passwrod.length == 0){
        passwrodErrorLO.innerHTML = 'Password is required';
        return false;
    }

    if(passwrod.length <= 8){
        passwrodErrorLO.innerHTML = 'Password should be 8 digits or more';
        return false;
    }

    if(!passwrod.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
        passwrodErrorLO.innerHTML = 'Password is wrong';
        return false;
    }

    passwrodErrorLO.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateFormRE(){
    if(!validateName() || !validatePhone() || !validateEmail() || !validatePassword()){
        submitError.style.display = 'block';
        submitError.innerHTML= 'please fix the error';
        setTimeout(function(){submitError.style.display = 'none';},3000);
        return false;
    }
}

function validateFormLO(){
    if(!validateEmailLO() || !validatePasswordLO()){
        submitErrorLO.style.display = 'block';
        submitErrorLO.innerHTML= 'please fix the error';
        setTimeout(function(){submitErrorLO.style.display = 'none';},3000);
        return false;
    }
}
