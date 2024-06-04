window.onclick= function (event) {
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

let users = JSON.parse(localStorage.getItem('users')) || [];  // lấy categoris từ localStorage
    render(users);

function render(users) {
    let ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
    let prevPageButton = document.getElementById('prevPage');
    let nextPageButton = document.getElementById('nextPage');
    let currentPageSpan = document.getElementById('currentPage');

    let currentPage = 1;
    let ordersPerPage = 10; // Số lượng users trên mỗi trang

    function updateTable() {
        ordersTable.innerHTML = ''; 
        let pageOrders = users.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);
        
        pageOrders.forEach((user, index) => {
            let row = ordersTable.insertRow(index);
            row.insertCell(0).innerText = user.id ;
            row.insertCell(1).innerText = user.name;
            row.insertCell(2).innerText = user.email;
            row.insertCell(3).innerText = user.role;
            row.insertCell(4).innerText = user.date;
           
            let actionCell = row.insertCell(5);
            let xemButton = document.createElement('button');
            xemButton.innerText = 'xem';
            actionCell.appendChild(xemButton);
            let xem1Button = document.createElement('button');
            xem1Button.innerText = 'hoạt động';
            actionCell.appendChild(xem1Button);
            let input = document.createElement('input');
            input.type= "checkbox";
            input.checked =user['status'];
            actionCell.appendChild(input);

            // deleteButton.addEventListener('click', function() {
            //     deleteCategory(user.id);
            // });
            // actionCell.appendChild(deleteButton);
        });

        currentPageSpan.innerText = currentPage;
    }
    
    prevPageButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updateTable();
        }
    });
    nextPageButton.addEventListener('click', function() {
        if ((currentPage * ordersPerPage) < users.length) {
            currentPage++;
            updateTable();
        }
    });

    updateTable();
};


function timKiem() {
    let allUsers = [];
    let tk = document.getElementById("search").value;
    for( let i = 0; i < users.length ; i++) {
        if(users[i].name.toLowerCase().includes(tk.toLowerCase())) {
            allUsers.push(users[i]);
        }
    }
    render(allUsers);

}


     

  