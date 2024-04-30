import { getDb } from "../../../configs/mongodb.config.js";
import ApplicationError from "../../../error-handler/applicationError.js";


export default class UserRepository {

    // We will call these functions form our controller:

    SignUp(instanceUserModel) {
        const { name, email, password, type } = instanceUserModel;
        if (!name || !email || !password || !type) {
            throw new ApplicationError("Signup fields are insufficient", 400);
        }

        // const instanceUserModel = new UserModel(name, email, password, type);
        // users.push(instanceUserModel);
        // console.log(users);

        // Get the database
        const instanceDB = getDb();

        // Get the collection
        const usersCollection = instanceDB.collection("users");

        // Insert new user into the collection
        return usersCollection.insertOne(instanceUserModel)
            .then((result) => {
                console.log(`New user added to database with insertID: ${result.insertedId}`);
                return instanceUserModel;
            })
            .catch((err) => {
                throw new ApplicationError("Couldn't enter user into dataBase", 400);
            })
    }

    SignIn(req) {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ApplicationError("SignIn fields are insufficient", 400);
        }

        // Get the database
        const instanceDB = getDb();

        // Get the collection
        const usersCollection = instanceDB.collection("users");

        // Insert new user into the collection
        return usersCollection.findOne({ email, password })
            .then((user) => {
                return user;
            })
            .catch((err) => {
                throw new ApplicationError("Couldn't Perform Search In DataBase", 400);
            })
    }

    findByEmail(email) {
        if (!email) {
            throw new ApplicationError("Email field is empty", 400);
        }

        // Get the database
        const instanceDB = getDb();

        // Get the collection
        const usersCollection = instanceDB.collection("users");

        // Insert new user into the collection
        return usersCollection.findOne({ email })
            .then((user) => {
                return user;
            })
            .catch((err) => {
                throw new ApplicationError("Couldn't search email in dataBase", 400);
            })
    }
}