// scripts.js

document.addEventListener('DOMContentLoaded', function () {

    // Handle login form submission
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        console.log('Login form submitted');
        console.log('Email:', email);
        console.log('Password:', password);

        if (email && password) {
            alert('Login successful!');
            // Save login state in local storage (example)
            localStorage.setItem('user', JSON.stringify({ email, password, loggedIn: true }));
            console.log('User data saved to local storage:', { email, password, loggedIn: true });
            // Redirect or update UI as needed
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Handle registration form submission
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const role = document.getElementById('registerRole').value;
        const phone = document.getElementById('registerPhone').value;
        const location = document.getElementById('registerLocation').value;

        console.log('Registration form submitted');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Role:', role);
        console.log('Phone:', phone);
        console.log('Location:', location);

        if (email && password && role && phone && location) {
            alert('Registration successful!');
            // Save user data in local storage
            localStorage.setItem('user', JSON.stringify({
                email,
                password,
                role,
                phone,
                location
            }));
            console.log('User data saved to local storage:', {
                email,
                password,
                role,
                phone,
                location
            });
            // Redirect or update UI as needed
        } else {
            alert('Please fill in all fields.');
        }
    });

});
