
window.onclick= function(event) {
    openCloseDropdown(event);
}

function closeAllDropdown () {
    let dropdowns = document.getElementsByClassName("dropdown-expand") ;
    for(let i = 0 ; i < dropdowns.length ; i++) {
        dropdowns[i].classList.remove("dropdown-expand")
    }
}

function openCloseDropdown (event) {
    if(!event.target.matches(".dropdown-toggle")) {
        closeAllDropdown();  //đóng dropdown khi click ra khỏi thanh dropdown menu 
    } else {
        let toggle = event.target.dataset.toggle;
        let content = document.getElementById(toggle);
    if(content.classList.contains("dropdown-expand")) {
        content.classList.remove("dropdown-expand");
        closeAllDropdown();
    } else {
        closeAllDropdown();
        content.classList.add("dropdown-expand");
    }
    }
}
document.addEventListener('DOMContentLoaded', function () {
    //  lấy dữ liệu từ local storage về
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // tạo element của HTML
    let userList = document.getElementById('userList');
    let table = document.createElement('table'); // tạo một cái element table
    table.classList.add('table-users');

    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    // tạo tr
    let headerRow = document.createElement('tr');
    ['ID', 'Tên đăng nhập', 'Email', 'Role', 'Date', 'Action'].forEach(text => {
        let th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th); // appendChild(th) thêm element con vào element cha
    });

    thead.appendChild(headerRow);

    // từng hàng users
    users.forEach(user => {
        let tr = document.createElement('tr');
        // console.log(Object.values(user));
        // lấy hết giá trị trong object user trừ pasword và thẻ card, trạng thái
        let {password,card, status,...restInfoUser } = user;
        Object.values(restInfoUser).forEach(value => {
            let td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
        // nếu là status thì thêm toggle button
        // <div class="form-check form-switch">
        //     <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
        //     <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
        // </div>
        let input = document.createElement('input');
        input.type= "checkbox";
        input.checked =user['status'];
        let td2 = document.createElement('td');
        td2.appendChild(input);
        tr.appendChild(td2);

    });

    table.appendChild(thead);
    table.appendChild(tbody);
    userList.appendChild(table);

});