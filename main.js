var selectedRow = null;

// Show alert 
function showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const main = document.querySelector('.main');
    container.insertBefore(div, main);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

// Clear input fields
function clearFields() {
    document.querySelector('#firstname').value = '';
    document.querySelector('#lastname').value = '';
    document.querySelector('#rollNo').value = '';
}

// Add data
document.querySelector('#student-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const firstname = document.querySelector('#firstname').value;
    const lastname = document.querySelector('#lastname').value;
    const rollNo = document.querySelector('#rollNo').value;
    if (firstname === '' || lastname === '' || rollNo === '') {
        showAlert('Please fill in all fields', 'danger');
    } else {
        if (selectedRow === null) {
            const list = document.querySelector('#student-list');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${firstname}</td>
                <td>${lastname}</td>
                <td>${rollNo}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert('Student added', 'success');
        } else {
            selectedRow.children[0].textContent = firstname;
            selectedRow.children[1].textContent = lastname;
            selectedRow.children[2].textContent = rollNo;
            selectedRow = null;
            showAlert('Student updated', 'success');
        }
        clearFields();
    }
});

// Edit data
document.querySelector('#student-list').addEventListener('click', (e) => {
    target = e.target;
    if (target.classList.contains('edit')) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector('#firstname').value = selectedRow.children[0].textContent;
        document.querySelector('#lastname').value = selectedRow.children[1].textContent;
        document.querySelector('#rollNo').value = selectedRow.children[2].textContent;
    }
});

// Delete data
document.querySelector('#student-list').addEventListener('click', (e) => {
    target = e.target;
    if (target.classList.contains('delete')) {
        target.parentElement.parentElement.remove();
        showAlert('Student deleted', 'danger');
    }
});
