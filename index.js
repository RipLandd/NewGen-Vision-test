// Тестовая задача:

class UserService {
    var username;
    var password;

    constructor (username, password) {
        this.username = username;
        this.password = password;
    }

    get username() {
        return UserService.username;
    }

    get password() {
        throw "You are not allowed to get password";
    }

    static authenticate_user() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', ' https://examples.com/api/user/authenticate?username='+
            UserService.username + '&password=' + UserService.passoword, true);
        xhr.responseType = 'json';

        const result = false;

        xhr.onload = function() {
            if(xhr.status !== '200'){
                result = xhr.response;
            } else {
                result = true;
            }
        };

        return result;
    }
}

$('form #login').click(function (){
    var username = $('#username');
    var password = $('#password');

    var res = UserService(username, password).authenticate_user();

    if(res == true) {
        document.location.href = '/home';
    } else {
        alert(res.error);
    }
})



// Решение тестовой задачи:

class UserService {
    /*  var username;
        var password;
        Нет необходимости в создании переменных var 
    */
    constructor (username, password) {
        this.username = username;
        this.password = password;
    }
    
    /*get user() {
        return this.username;
    }

    get pass() {
        return this.password;
    } 
    Для дальнейшего выполнения кода, нет необходимости в применении get в классе.
    */ 

    authenticate_user() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://examples.com/api/user/authenticate?username=' +
            this.username + '&password=' + this.passoword, false); //false потому что запрос выполняеться синхронно
        // xhr.responseType = 'json'; запрос и так выполняется в формате json

        xhr.send(); // Без xhr.send() не отправится запрос

        /*  const result = false; 
            необходимо просто создать переменную
        */
        let result;
         xhr.onload = function(){
            if(xhr.status !== '200'){
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Необходимо вывести статус и описание ошибки, в том случае если GET-запрос не удался
            } else {
                result = true;
            }
         };
        return result;
    }
}

$('form #login').click(function (){
    var username = $('#username').val();
    var password = $('#password').val();

    /*var res = UserService(username, password).authenticate_user();  Не правильный синтаксис*/
    let res = new UserService(username, password).authenticate_user();
    if(res == true) {
        document.location.href = '/home';
    } else {
        alert(res.error);
    }
})









