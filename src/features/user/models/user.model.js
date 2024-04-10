export default class UserModel {
    constructor(name, email, password, type) {
        this.name = name;
        this.email = email;
        this.password = password
        this.type = type;
    }

    static SignUp(name, email, password, type){
        users.push(new UserModel(name, email, password, type));
        console.log(users);
    }

    static SignIn(email, password){
        return users.find(eachUser => eachUser.email == email && eachUser.password == password)
    }

    static getAllUsers(){
        return users;
    }
}

var users = [
    new UserModel('Seller User 1', 'seller1@ecom.com', 'password1', 'Seller'),
    new UserModel('Seller User 2', 'seller2@ecom.com', 'password2', 'Seller'),
    new UserModel('Admin User 1', 'admin1@ecom.com', 'password3', 'Admin'),
]
