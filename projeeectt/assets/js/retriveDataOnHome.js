// Retrieve products from local 
let productsContainer = JSON.parse(localStorage.getItem('myProducts')) || [];

function displayProducts() {
    var container = document.getElementById('productsContainer');
    container.innerHTML = ''; 


    console.log(productsContainer);
    productsContainer.forEach(product => {
        container.innerHTML += `
            <div class="sectionfour-item sectiontwo-item">
                <div class="item-rprice">
                    <p>- 60%</p> 
                </div>
                <div class="item-sp">
                    <a href="./product${product.id}.html">
                        <img src="${product.image}" alt="${product.name}" />
                    </a>
                </div>
                <div class="item-sp">
                    <a href="./product${product.id}.html" class="item-sp--name">${product.name}</a>
                    <div class="item-sp-price">
                        <p class="item-sp--cost">${product.price}<a>$</a></p>
                        <p class="item-sp--rprice">200<a>$</a></p> 
                    </div>
                </div>
            </div>`;
    });
}

document.addEventListener('DOMContentLoaded', displayProducts);
