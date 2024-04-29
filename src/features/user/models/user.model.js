import { getDb } from "../../../configs/mongodb.config.js";
import ApplicationError from "../../../error-handler/applicationError.js";

let id = 0;

export default class UserModel {

    constructor(name, email, password, type) {
        this.id = ++id;
        this.name = name;
        this.email = email;
        this.password = password
        this.type = type;
    }

    /*
        static SignUp(name, email, password, type) {
            if (!name || !email || !password || !type) {
                throw new ApplicationError("Signup fields are insufficient", 400);
            }
    
            const instanceUserModel = new UserModel(name, email, password, type);
            users.push(instanceUserModel);
            console.log(users);
    
            // Get the database
            const instanceDB = getDb();
    
            // Get the collection
            const usersCollection = instanceDB.collection("users");
    
            // Insert new user into the collection
            return usersCollection.insertOne(instanceUserModel)
                .then((result) => {
                    console.log(`New data added to database with insertID: ${result.insertedId}`);
                    return instanceUserModel;
                })
                .catch((err) => {
                    throw new ApplicationError("Couldn't Enter Data Into DataBase", 400);
                })
        }
    
        static SignIn(email, password) {
            return users.find(eachUser => eachUser.email == email && eachUser.password == password)
        }
    */

    static getAllUsers() {
        return users;
    }
}

var users = [
    new UserModel('Seller User 1', 'seller1@ecom.com', 'password1', 'Seller'),
    new UserModel('Seller User 2', 'seller2@ecom.com', 'password2', 'Seller'),
    new UserModel('Admin User 1', 'admin1@ecom.com', 'password3', 'Admin'),
    new UserModel('Customer User 1', 'customer1@ecom.com', 'password4', 'Customer'),
]