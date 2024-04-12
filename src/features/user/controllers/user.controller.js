import UserModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export default class UserController {

    signup(req, res) {
        const { name, email, password, type } = req.body;
        UserModel.SignUp(name, email, password, type);
        res.status(201).json({ 'message': 'User Successfully Added' });
    }

    signin(req, res) {
        const { email, password } = req.body;
        const user = UserModel.SignIn(email, password);

        if (!user) {
            return res.status(400).json({ "message": `User Doesn't Exist`, 'user': user });
        } else {
            // condition when login in successful
            // 1. create our token - here we define what we want to store in the payload section of our token
            const token = jwt.sign({ 'email': user.email, 'name': user.name, 'type': user.type }, "p7tiOCS9eIR0rCeDPi7GzWhc8m7oyoQK", { expiresIn: "12h", });

            // 2. send the token
            // return res.status(200).json({"message":`User Exist`, 'user': user});

            return res.status(200).json({ "message": `User Exist`, 'user': user, 'token': token },)
        }
    }
}
