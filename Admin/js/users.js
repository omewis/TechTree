document.addEventListener('DOMContentLoaded', function() {
    function displayUsers() {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        var userTableBody = document.getElementById('userTableBody');
        
        userTableBody.innerHTML = '';
        if (users.length === 0) {
            userTableBody.innerHTML = '<tr><td colspan="4">No users found.</td></tr>';
            return;
        }
        users.forEach(user => {
            var row = document.createElement('tr');

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.fullName}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="editUser(${user.id})">Edit</button>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                </td>
            `;
            
            userTableBody.appendChild(row);
        });
    }

    function editUser(userId) {
        alert('Edit user with ID: ' + userId);
    }

    function deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            users = users.filter(user => user.id !== userId);
            
            localStorage.setItem('users', JSON.stringify(users));
            
            displayUsers();
        }
    }

    displayUsers();
});