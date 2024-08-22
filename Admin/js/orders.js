document.addEventListener('DOMContentLoaded', function() {
    var orderTableBody = document.getElementById('orderTableBody');
    var order = JSON.parse(localStorage.getItem('order')) || {};

    if (order) {
        var row = document.createElement('tr');
        
        var cells = [
            order.fullName,
            order.phone || 'N/A',
            order.address || 'N/A',
            order.cardNumber || 'N/A',
            order.date || 'N/A',
    
            `$${(order.total || 0).toFixed(2)}`,
            order.email || 'N/A'
        ];

        cells.forEach(cellValue => {
            var cell = document.createElement('td');
            cell.textContent = cellValue;
            row.appendChild(cell);
        });

        orderTableBody.appendChild(row);
    } else {
        orderTableBody.innerHTML = '<tr><td colspan="9">No order data found.</td></tr>';
    }
});