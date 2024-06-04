document.addEventListener('DOMContentLoaded', function () {
    let ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
    let prevPageButton = document.getElementById('prevPage');
    let nextPageButton = document.getElementById('nextPage');
    let currentPageSpan = document.getElementById('currentPage');

    let currentPage = 1;
    let ordersPerPage = 10; // Số lượng đơn đặt hàng trên mỗi trang

    let categories = JSON.parse(localStorage.getItem('categories')) || []; // lấy categoris từ localStorage
    let allProducts = [];

    for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < categories[i].products.length; j++) {
            allProducts.push(categories[i].products[j]);
        }
    }   

    
    function searchProducts(query) {
        let initAllProducts = allProducts;
        if(query) {
            // Lọc sản phẩm dựa trên truy vấn tìm kiếm
        allProducts = allProducts.filter(product => product.productName.toLowerCase().includes(query.toLowerCase()));
        console.log(query);
        } 
        updateTable();
        allProducts = initAllProducts;
    }

        document.getElementById('search').addEventListener('input', function(event) {
            
            if(event.target.value.trim()) {
                searchProducts(event.target.value.trim());
            } else {
                allProducts = [];
                for (let i = 0; i < categories.length; i++) {
                    for (let j = 0; j < categories[i].products.length; j++) {
                        allProducts.push(categories[i].products[j]);
                    }
                }   
                updateTable();
                
            }
         });


    function updateTable() {
        ordersTable.innerHTML = ''; 
        let pageOrders = allProducts.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

        // Thêm đơn hàng vào bảnge
        pageOrders.forEach((product, index) => {
                let row = ordersTable.insertRow(index);
                row.insertCell(0).innerText = index + 1;
                row.insertCell(1).innerText = product.productName;
                row.insertCell(2).innerText = product.status;
                row.insertCell(3).innerText = getCategoryName(product.categoryId);
                row.insertCell(4).innerText = product.price;
                row.insertCell(5).innerText = product.date;


                let actionCell = row.insertCell(6);
                let updateButton = document.createElement('button');
                updateButton.innerText = 'Edit';
                updateButton.addEventListener('click', function () {
                    window.location.href = "add_Product.html";

                    updateOrderStatus(product.id);
                });
                actionCell.appendChild(updateButton);

                let deleteButton = document.createElement('button');
                deleteButton.innerText = 'Delete';
                deleteButton.addEventListener('click', function () {
                    deleteProduct(product.id, product.categoryId);
                });
                actionCell.appendChild(deleteButton);
            });

            currentPageSpan.innerText = currentPage;
    }

    // Lấy category name theo id
    function getCategoryName(categoryId) {
       return categories.filter((category) => category.id == categoryId)[0].categoryName;
    }

    // let idEdit1 = -1;
    // function updateOrderStatus(orderId) {
    //     let productInfo;
    //     for (let i = 0; i < categories.length; i++) {
    //          if(categories[i].id == categoryId) {
    //             productInfo = categories[i];
    //             idEdit1 = productInfo.id;
    //             break;
    //         }
    //         console.log(` Sửa sản phẩm ${orderId}`);
            
    //     }

    // }

    function deleteProduct(productId,categoryId) {
        for(let i = 0; i < categories.length; i++) {
            // Tìm category hiện tại của sp muốn xóa
            if(categories[i].id == categoryId) {
                for(let j = 0; j < categories[i].products.length; j++) {

                    // Xoa product trong mảng product
                    if(categories[i].products[j].id == productId) {
                        categories[i].products.splice(j,1);
                    }
                }
            }
        }
        localStorage.setItem("categories",JSON.stringify(categories));
        // xoá sản phẩm
        console.log(`Xoá sản phẩm ${productId}`);
        location.reload()
    }

    // Xử lý phân trang
    prevPageButton.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            updateTable();
        }
    });
    nextPageButton.addEventListener('click', function () {
        if ((currentPage * ordersPerPage) < allProducts.length) {
            currentPage++;
            updateTable();
        }
    });

    updateTable();
});



  
  