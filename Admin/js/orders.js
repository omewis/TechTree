document.addEventListener('DOMContentLoaded', function() {
    const orderTableBody = document.getElementById('orderTableBody');
    const order = JSON.parse(localStorage.getItem('order')) || {};

    if (order) {
        const row = document.createElement('tr');
        
        const cells = [
            order.fullName,
            order.phone || 'N/A',
            order.address || 'N/A',
            order.cardNumber || 'N/A',
            order.date || 'N/A',
            `$${(order.subtotal || 0).toFixed(2)}`,
            `$${(order.total || 0).toFixed(2)}`,
            order.email || 'N/A'
        ];

        cells.forEach(cellValue => {
            const cell = document.createElement('td');
            cell.textContent = cellValue;
            row.appendChild(cell);
        });

        orderTableBody.appendChild(row);
    } else {
        orderTableBody.innerHTML = '<tr><td colspan="9">No order data found.</td></tr>';
    }
});