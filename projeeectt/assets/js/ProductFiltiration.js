document.addEventListener("DOMContentLoaded", () => {
    var categories = JSON.parse(localStorage.getItem('categories')) || [];
    var productsContainer = JSON.parse(localStorage.getItem('myProducts')) || [];

    var categoriesContainer = document.getElementById('categoriesContainer');
    categoriesContainer.innerHTML = '';
    categories.forEach(category => {
        categoriesContainer.innerHTML += `
            <li class="item-name">
                <input type="checkbox" id="category-${category.id}" />
                <label for="category-${category.id}">${category.name}</label>
            </li>
        `;
    });

    var filters = document.querySelectorAll('.sidebar-item input[type="checkbox"]');
    
    var sortOptions = document.querySelectorAll('.sort-product-item input[type="radio"]');
    
    function applyFilters() {
        // Get selected categories by filtering checkboxes that are checked and have IDs starting with "category-"
        var selectedCategories = Array.from(filters)
            .filter(checkbox => checkbox.checked && checkbox.id.startsWith("category-"))
            .map(checkbox => checkbox.id.replace("category-", ""));
    
        var priceRanges = Array.from(filters)
            .filter(checkbox => checkbox.checked && checkbox.id.startsWith("price-"))
            .map(checkbox => {
                var range = checkbox.id.replace("price-", "").split("-");
                return {
                    min: parseInt(range[0]), // Minimum price of the range
                    max: range[1] ? parseInt(range[1]) : Infinity, // Maximum price of the range, default to Infinity if not specified
                };
            });

        // Filter products based on selected filters
        var filteredProducts = productsContainer.filter(product => {
            var itemCategory = product.category;
            var itemPrice = parseInt(product.price);
            var isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(itemCategory);
            var isPriceMatch = priceRanges.length === 0 || priceRanges.some(range => itemPrice >= range.min && itemPrice <= range.max);
            return isCategoryMatch && isPriceMatch;
        });

        // Display filtered products
        displayFilteredProducts(filteredProducts);

        // Sort the items after applying filters
        sortItems(filteredProducts);
    }

    // Function to display filtered products
    function displayFilteredProducts(products) {
        var containerTwo = document.getElementById('productsContainerTwo');
        containerTwo.innerHTML = '';

        products.forEach(product => {
            containerTwo.innerHTML += `
                <div class="col-md-5.5 col-sm-6 mb-4 section-item" data-price="${product.price}" id="${product.category}">
                    <div class="sectiontwo-item">
                        <div class="item-sp item-sp--img">
                            <a href="./guava.html?id=${product.id}">
                                <img src="${product.image}" alt="${product.name}" class="img-fluid">
                            </a>
                        </div>
                        <div class="item-sp item-price">
                            
                            <a href="./guava.html?id=${product.id}" class="item-sp--name">${product.name}</a>
                            <div class="item-sp-price">
                                <p class="item-sp--cost">${product.price}<a>$</a></p>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
    }

    // Function to sort the items based on the selected sorting option
    function sortItems(filteredProducts) {
        var sortBy = Array.from(sortOptions)
            .find(option => option.checked)
            ?.nextElementSibling.innerText.trim();

        if (sortBy) {
            var sortedItems = filteredProducts.slice().sort((a, b) => {
                var aText = a.name.toLowerCase();
                var bText = b.name.toLowerCase();

                if (sortBy === "Name A-Z") return aText.localeCompare(bText);
                if (sortBy === "Name Z-A") return bText.localeCompare(aText);
                if (sortBy === "Price low to high")
                    return parseInt(a.price) - parseInt(b.price);
                if (sortBy === "Price high to low")
                    return parseInt(b.price) - parseInt(a.price);

                return 0;
            });

            // Display sorted products
            displayFilteredProducts(sortedItems);
        }
    }

    // Add event listeners to each filter checkbox to apply filters on change
    filters.forEach(filter => filter.addEventListener('change', applyFilters));
    
    // Add event listeners to each sort option radio button to sort items on change
    sortOptions.forEach(option => option.addEventListener('change', () => sortItems(productsContainer)));

    // Initial display of products
    displayFilteredProducts(productsContainer);
});
