window.onclick = function (event) {
    openCloseDropdown(event);
}

function closeAllDropdown() {
    let dropdowns = document.getElementsByClassName("dropdown-expand");
    for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.remove("dropdown-expand")
    }
}

function openCloseDropdown(event) {
    if (!event.target.matches(".dropdown-toggle")) {
        closeAllDropdown();  //đóng dropdown khi click ra khỏi thanh dropdown menu 
    } else {
        let toggle = event.target.dataset.toggle;
        let content = document.getElementById(toggle);
        if (content.classList.contains("dropdown-expand")) {
            content.classList.remove("dropdown-expand");
            closeAllDropdown();
        } else {
            closeAllDropdown();
            content.classList.add("dropdown-expand");
        }
    }
}
// <div class="col-md-3 mb-3">
//     <img src="../project/asset/áo khoác.jpeg" class="img-fluid img"><br><br>
//     <h4>Tên sản phẩm</h4>
//     <h5>Giá: 400.000đ</h5>
//     <button>Thêm vào giỏ hàng </button>
// </div>
let categories = JSON.parse(localStorage.getItem('categories')) || [];
let row = document.getElementById('productInfo');
let allProducts = [];

for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < categories[i].products.length; j++) {
        allProducts.push(categories[i].products[j]);
    }
}
render(allProducts);
function render(allProducts) {
    // let productInfo = document.getElementById('productInfo');
    // productInfo.innerHTML = "";
    row.innerHTML= "";
    allProducts.forEach(product => {
        // console.log(product);

        let div = document.createElement('div');
        div.className = "col-md-3 mb-5";
        let img = document.createElement('img');
        img.src = product.image;
        img.className = "img-fluid img";
        let productNameH4 = document.createElement('h5');
        productNameH4.textContent = product.productName;
        let productPriceH4 = document.createElement('p');
        productPriceH4.textContent = "Giá: " + product.price;
        let button = document.createElement('button');
        button.textContent = "Thêm vào giỏ hàng"
        button.className = "mua"

        div.appendChild(img);
        div.appendChild(productNameH4);
        div.appendChild(productPriceH4);
        div.appendChild(button);
        row.appendChild(div);
    });

}



function timKiem() {
    let filterProducts = [];
    let tk = document.getElementById("search").value;
    for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].productName.toLowerCase().includes(tk.toLowerCase())) {
            filterProducts.push(allProducts[i]);
        }
    }
    console.log(filterProducts);
    console.log(13);
    render(filterProducts);

}

