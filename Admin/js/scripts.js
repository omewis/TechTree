// Regular expressions for validation
var regex = {
    //id: /^\d+$/, // number
    name: /^[A-Za-z\s]{2,50}$/, //  2-50 letters 
    price: /^\d+(\.\d{1,2})?$/, //  positive number with up to 2 decimal places
    category: /^[A-Za-z\s]+$/, //  letters and spaces
    description: /^.{1,200}$/, //  200 characters
    image: /.+/, //not empty
    quantity: /^[1-9]\d*$/ //positive number
};

// Get form elements
//var productID = document.getElementById('productID');
var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productImage = document.getElementById('productImage');
var productDescription = document.getElementById('productDescription');
var productQuantity = document.getElementById('productQuantity');

var productsContainer;

// Load products from local storage if available
if (localStorage.getItem('myProducts') != null) {
    productsContainer = JSON.parse(localStorage.getItem('myProducts'));
    displayProducts(productsContainer);
} else {
    productsContainer = [];
}


document.addEventListener('DOMContentLoaded', function () {
    let productCategory = document.getElementById('productCategory');

    let categoriesContainer = JSON.parse(localStorage.getItem('categories')) || [];

    categoriesContainer.forEach(category => {
        let option = document.createElement('option');
        option.value = category.id; 
        option.textContent = category.name; 
        productCategory.appendChild(option);
    });
});

// Function to add a new product
function addProduct() {
    let selectedCategoryId = document.getElementById('productCategory').value;
    let imageFile = productImage.files[0];

    // Convert the image to base64
    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = function () {
        let base64Image = reader.result;

        let errors = validateProduct({
            //id: productID.value,
            name: productName.value,
            price: productPrice.value,
            category: selectedCategoryId, 
            description: productDescription.value,
            image: base64Image, // Base64 image string
            quantity: productQuantity.value
        });

        displayErrors(errors);
        //if there is no errors complete the process

        if (Object.keys(errors).length === 0) {
            let newProductId;

            if (productsContainer.length > 0) {
                let lastProduct = productsContainer[productsContainer.length - 1];
                newProductId = lastProduct.id + 1;
            } else {
                newProductId = 1;
            }
            
            let product = {
                id: newProductId,  // Set the new product ID
                name: productName.value,
                price: productPrice.value,
                category: productCategory.value,
                image: base64Image, // Store base64 image in the product object
                description: productDescription.value,
                quantity: productQuantity.value
            };
            

            productsContainer.push(product);
            localStorage.setItem('myProducts', JSON.stringify(productsContainer));
            clearForm();
            displayProducts(productsContainer);
        }
    };
}

// Function to display validation errors
function displayErrors(errors) {
    //document.getElementById('errorProductID').textContent = errors.id || '';
    document.getElementById('errorProductName').textContent = errors.name || '';
    document.getElementById('errorProductPrice').textContent = errors.price || '';
    document.getElementById('errorProductCategory').textContent = errors.category || '';
    document.getElementById('errorProductImage').textContent = errors.image || '';
    document.getElementById('errorProductDescription').textContent = errors.description || '';
    document.getElementById('errorProductQuantity').textContent = errors.quantity || '';
}

// Function to clear the form
function clearForm() {
    //productID.value = "";
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productImage.value = "";
    productDescription.value = "";
    productQuantity.value = "";
}

// Function to display products in the table
let categoriesContainer = JSON.parse(localStorage.getItem('categories')) || {};
let categoryMap = {};
categoriesContainer.forEach(category => {
    categoryMap[category.id] = category.name;
});

function displayProducts(productList) {
    let list = '';
    for (let i = 0; i < productList.length; i++) {
        list += `<tr>
                    <td>${productList[i].id}</td> 
                    <td>${productList[i].name}</td>
                    <td>${productList[i].price}</td>
                    <td>
                    ${productList[i].category}
                    </td>
                    <td><img src="${productList[i].image}" alt="Product Image" style="width: 100px; height: auto;"></td>
                    <td>${productList[i].description}</td>
                    <td>${productList[i].quantity}</td>
                    <td>
                        <button class="update-button" data-index="${i}">Update</button>
                        <button class="delete-button" data-index="${i}">Delete</button>
                    </td>
                </tr>`;
    }
    document.getElementById('tablebody').innerHTML = list;

    // Attach event listeners to update and delete buttons
    document.querySelectorAll('.update-button').forEach(button => {
        button.addEventListener('click', updateProduct);
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', deleteProduct);
    });
}

// Function to delete a product
function deleteProduct(event) {
    let index = event.target.getAttribute('data-index'); //identify the position of the product in the container
    productsContainer.splice(index, 1);
    localStorage.setItem('myProducts', JSON.stringify(productsContainer));
    displayProducts(productsContainer);
}

// Function to update a product
function updateProduct(event) {
    let index = event.target.getAttribute('data-index');
    let product = productsContainer[index];

    // Populate form fields with the selected product's data
    productName.value = product.name;
    productPrice.value = product.price;
    productCategory.value = product.category;
    productDescription.value = product.description;
    productQuantity.value = product.quantity;

    // Change button text to indicate an update
    document.getElementById('addProductBtn').textContent = 'Save Changes';
    document.getElementById('addProductBtn').removeEventListener('click', addProduct);
    document.getElementById('addProductBtn').addEventListener('click', function saveChanges() {
        let imageFile = productImage.files[0];
        
        if (imageFile) {
            let reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onloadend = function () {
                let base64Image = reader.result;

                let errors = validateProduct({
                    id: product.id, // Include the id for validation
                    name: productName.value,
                    price: productPrice.value,
                    category: productCategory.value,
                    description: productDescription.value,
                    image: base64Image,
                    quantity: productQuantity.value
                });

                displayErrors(errors);

                if (Object.keys(errors).length === 0) {
                    productsContainer[index] = {
                        id: product.id,  // Preserve the existing product ID
                        name: productName.value,
                        price: productPrice.value,
                        category: productCategory.value,
                        image: base64Image, // Store base64 image
                        description: productDescription.value,
                        quantity: productQuantity.value
                    };

                    localStorage.setItem('myProducts', JSON.stringify(productsContainer));
                    clearForm();
                    displayProducts(productsContainer);

                    // Reset button to Add Product
                    document.getElementById('addProductBtn').textContent = 'Add Product';
                    document.getElementById('addProductBtn').removeEventListener('click', saveChanges);
                    document.getElementById('addProductBtn').addEventListener('click', addProduct);
                }
            };
        } else {
            // If no new image, keep the existing one
            let errors = validateProduct({
                id: product.id, // Include the id for validation
                name: productName.value,
                price: productPrice.value,
                category: productCategory.value,
                description: productDescription.value,
                image: product.image, // Keep the existing image
                quantity: productQuantity.value
            });

            displayErrors(errors);

            if (Object.keys(errors).length === 0) {
                productsContainer[index] = {
                    id: product.id,  // Preserve the existing product ID
                    name: productName.value,
                    price: productPrice.value,
                    category: productCategory.value,
                    image: product.image, // Keep the existing base64 image
                    description: productDescription.value,
                    quantity: productQuantity.value
                };

                localStorage.setItem('myProducts', JSON.stringify(productsContainer));
                clearForm();
                displayProducts(productsContainer);

                // Reset button to Add Product
                document.getElementById('addProductBtn').textContent = 'Add Product';
                document.getElementById('addProductBtn').removeEventListener('click', saveChanges);
                document.getElementById('addProductBtn').addEventListener('click', addProduct);
            }
        }
    });
}


// Validation function
function validateProduct(product) {
    let errors = {};

 
    // Validate Product Name
    if (!regex.name.test(product.name)) {
        errors.name = 'Product Name must be 2-50 letters and spaces.';
    }

    // Validate Product Price
    if (!regex.price.test(product.price)) {
        errors.price = 'Product Price must be a positive number with up to 2 decimal places.';
    }

    // Validate Product Category
    // if (!regex.category.test(product.category)) {
    //     errors.category = 'Product Category must contain only letters and spaces.';
    // }

    // Validate Product Description
    if (!regex.description.test(product.description)) {
        errors.description = 'Product Description must be up to 200 characters.';
    }

    // Validate Product Image
    if (!product.image) {
        errors.image = 'Product Image is required.';
    }

    // Validate Product Quantity
    if (!regex.quantity.test(product.quantity)) {
        errors.quantity = 'Product Quantity must be a positive number.';
    }

    return errors;
}

// Attach event listener to the Add Product button
document.getElementById('addProductBtn').addEventListener('click', addProduct);
