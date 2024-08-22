document.getElementById('loginButton').addEventListener('click', function(event) {
    event.preventDefault();

    var email = document.getElementById('emailInput').value;
    var password = document.getElementById('passwordInput').value;

    if (email === 'admin@admin.com' && password === '1234') {
        window.location.href = 'index.html#'; 
    } else {
        var errorMessage = document.getElementById('errorMessage');
        errorMessage.style.display = 'block'; 
    }
});