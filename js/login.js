let users = JSON.parse(localStorage.getItem('users')) || [];
function isValidEmail(email) {
    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
}

function usersId() {
    return Math.floor(Math.random() * 99999999 + new Date().getMilliseconds());
}

let date = new Date().toLocaleDateString('vi');

function singup(e) {
    e.preventDefault();
    
    let name = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let hasError = false;
    if(_.isEmpty(name)) {
        document.getElementsByClassName("form-message")[0].innerHTML = "Hãy nhập họ tên";
        hasError = true;
    } else {
        document.getElementsByClassName("form-message")[0].innerHTML = "";
    }

    if(_.isEmpty(email)) {
        document.getElementsByClassName("form-message")[1].innerHTML = "Hãy nhập email";
        hasError = true;
    } else if(!isValidEmail(email)) {
        document.getElementsByClassName("form-message")[1].innerHTML = "Hãy điền dúng cú pháp email ";
        hasError = true;
    } else {
        document.getElementsByClassName("form-message")[1].innerHTML = "";
    }

    if(_.isEmpty(password)) {
        document.getElementsByClassName("form-message")[2].innerHTML = "Hãy nhập password";
        hasError = true;
    } else {
        document.getElementsByClassName("form-message")[2].innerHTML = "";
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            alert("tài khoản này đã được đăng kí");
            return;
        }
    }

    if (!hasError) {

        let user = {
            id: usersId(),
            name: name,
            email: email,
            role: "User",
            date: date,
            status: true,
            cart: [],
            password: password,
        };
        users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href ="login.html"
    } else {
        alert ("Hãy nhập đầy đủ!")
    }
}

function login(e) {
    e.preventDefault();
    let email = document.getElementById("email1").value;
    let password = document.getElementById("password1").value;

    let login = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            login = true;
            localStorage.setItem('user',JSON.stringify(users[i]));
            window.location.href = "../index.html"
        }
    } 
    if (!login) {
        alert("email hay mật khẩu không chính xác")
    }

    
}

