// tạo dữ liệu của cartdetail ( chi tiết giỏ hàng) trong localStorage
// lấy dữ liệ từ trong localStorage hiển thị lên trang cartdetail

let cartDetail = JSON.parse(localStorage.getItem('cartdetail')) || [];


// {"order_detail_id":453455,"product_id":222222,"order_quantity":5}
// input : image,productName,description,price, quantity,

let categories = JSON.parse(localStorage.getItem('categories')) || [];
let allProducts = [];

for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < categories[i].products.length; j++) {
        allProducts.push(categories[i].products[j]);
    }
}

let orders = [];
cartDetail.forEach(order => {
    for (let i = 0; i < allProducts.length; i++) {
        if (order.product_id === allProducts[i].id) {
            console.log(order);
            order = {
                ...order, image: allProducts[i].image, productName: allProducts[i].productName,
                description: allProducts[i].description, price: allProducts[i].price,
            };
            orders.push(order);
        }
    }
});
console.log(orders);

function title(orders) {
    let div = document.createElement('div');
    div.className = "d-flex justify-content-between align-items-center mb-4";
    let title = `
         <div>
            <p class="mb-1">Giỏ hàng</p>
            <p class="mb-0">Bạn đang có ${orders.length} món đồ trong giỏ hàng</p>
        </div>
        <div>
            <p class="mb-0"><span class="text-muted">Sắp xếp theo:</span> <a href="#!"
            class="text-body">Giá<i class="fas fa-angle-down mt-1"></i></a></p>
        </div>
        `
        div.innerHTML = title;
    return div;
}

function renderOrder(order) {
    let div = document.createElement('div');
    div.className = "card mb-3 ";
    let elm = ` 
    <div class="card-body">
        <div class="d-flex justify-content-between">
            <div class="d-flex flex-row align-items-center">
                <div>
                    <img
                        src="${order.image}"
                        class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                </div>
                <div class="ms-3">
                    <h5>${order.productName}</h5>
                    <p class="small mb-0">${order.description}</p>
                </div>
            </div>
            <div class="d-flex flex-row align-items-center">
                    <input style="width: 45px;" type='number' value='${order.order_quantity}' 
                    min='1' class='fw-normal mb-0 soluong' id="soluong${order.id}>
                <div style="width: 80px;">
                    <h5 class="mb-0">${order.price*order.order_quantity}</h5>
                </div>
                <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
            </div>
        </div>
    </div>
`
    div.innerHTML = elm;
    console.log(div);
    return div;

}
let cart = document.getElementById('giohang');
    cart.appendChild(title(orders));
for (let i = 0; i < orders.length; i++) {
    // với mỗi phần tử order trong oders thì sẽ tạo ra div order

    cart.appendChild(renderOrder(orders[i]));
}

// tính tổng tiền: sẽ có giá sản phẩm và số lượng sản phẩm
// có order 
function sum (orders) {
    let totalPrice = 0; // với mỗi thằng order trong orders tổng tiền sẽ cộng thêm số tiền ứng với mỗi thằng order
    for ( let i = 0; i < orders.length ; i++) {
        totalPrice += Number(orders[i].price) * orders[i].order_quantity;
        
    }
     
    console.log(totalPrice);
    let totalPrice1 = document.getElementById('totalPrice');
    let elm = `
    <p class="mb-2">Tổng tiền</p>
    <p class="mb-2">${totalPrice}</p>
    `
    totalPrice1.innerHTML = elm;
    
    let totalPrice2 = document.getElementById('taxTotalPrice');
    let elm2 = `
    <p class="mb-2">Tổng cộng(Đã bao gồm thuế)</p>
    <p class="mb-2">${totalPrice*1.1}</p>
    `
    totalPrice2.innerHTML = elm2;
    
}
sum(orders);

function changeQuantity(order) {
    let idPrce = document.getElementById('soluong${{order.id}').value;
    order.order_quantity= idPrce;

}



