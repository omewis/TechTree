document.addEventListener('DOMContentLoaded', function () {
    let categoryID = document.getElementById('categoryID');
    let categoryName = document.getElementById('categoryName');
    let addCategoryBtn = document.getElementById('addCategoryBtn');
    let categoryTableBody = document.getElementById('categoryTableBody');
    let categoriesContainer = [];
    let currentCategoryIndex = null;  // track the index we want to update

    var regex = {
        id: /^\d+$/, // Number only
        name: /^[A-Za-z\s]{2,50}$/ // Letters and spaces, 2-50 characters
    };

    // Check if there is data in localStorage to retrieve it
    if (localStorage.getItem('categories')) {
        categoriesContainer = JSON.parse(localStorage.getItem('categories'));
        displayCategories();
    }

    // Add or Update Category with Validation
    addCategoryBtn.addEventListener('click', function () {
        let errors = validateCategory(categoryID.value, categoryName.value);

        // Display validation errors
        displayCategoryErrors(errors);

        // If no errors, proceed with adding/updating the category
        if (Object.keys(errors).length === 0) {
            if (currentCategoryIndex === null) {
                // Add new category
                let category = {
                    id: categoryID.value,
                    name: categoryName.value,
                };
                categoriesContainer.push(category);
            } else {
                // Update existing category
                categoriesContainer[currentCategoryIndex].id = categoryID.value;
                categoriesContainer[currentCategoryIndex].name = categoryName.value;
                currentCategoryIndex = null;  // Reset index after update
                addCategoryBtn.textContent = 'Add Category';  // Switch button text back
            }

            localStorage.setItem('categories', JSON.stringify(categoriesContainer));
            displayCategories();
            clearCategoryForm();
        }
    });

    // Validate Category
    function validateCategory(id, name) {
        let errors = {};

        // Validate Category ID
        if (!regex.id.test(id)) {
            errors.id = 'Category ID must be a number.';
        }

        // Validate Category Name
        if (!regex.name.test(name)) {
            errors.name = 'Category Name must be 2-50 letters and spaces.';
        }

        return errors;
    }

    // Display Validation Errors
    function displayCategoryErrors(errors) {
        document.getElementById('errorCategoryID').textContent = errors.id || '';
        document.getElementById('errorCategoryName').textContent = errors.name || '';
    }

    // Display Categories
    function displayCategories() {
        categoryTableBody.innerHTML = '';
        categoriesContainer.forEach((category, index) => {
            let row = `<tr>
                        <td>${index + 1}</td>
                        <td>${category.name}</td>
                        <td>
                            <button class="update-category btn btn-primary" onclick="updateCategory(${index})">Update</button>
                            <button class="delete-category btn btn-danger" onclick="deleteCategory(${index})">Delete</button>
                        </td>
                    </tr>`;
            categoryTableBody.innerHTML += row;
        });
    }

    // Clear Form
    function clearCategoryForm() {
        categoryID.value = '';
        categoryName.value = '';
        document.getElementById('errorCategoryID').textContent = '';  // Clear error messages
        document.getElementById('errorCategoryName').textContent = '';
    }

    // Delete Category
    window.deleteCategory = function (index) {
        categoriesContainer.splice(index, 1);
        localStorage.setItem('categories', JSON.stringify(categoriesContainer));
        displayCategories();
    };

    // Update Category
    window.updateCategory = function (index) {
        categoryID.value = categoriesContainer[index].id;
        categoryName.value = categoriesContainer[index].name;
        currentCategoryIndex = index;
        addCategoryBtn.textContent = 'Save Changes';
    };
});
