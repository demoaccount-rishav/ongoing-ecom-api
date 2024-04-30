import jwt from 'jsonwebtoken';
import UserModel from "../models/user.model.js";
import UserRepository from "../repository/user.repository.js";
import { compare, compareSync, genSaltSync, hashSync } from 'bcrypt';
import ApplicationError from '../../../error-handler/applicationError.js';

export default class UserController {
    constructor() {
        this.userRespository = new UserRepository();
    }

    signup(req, res, next) {
        const { name, email, password, type } = req.body;

        // for encrypted password generation using bcrypt 
        const salt = genSaltSync(10);
        const hashedPassword = hashSync(password, salt);

        const user = new UserModel(name, email, hashedPassword, type);

        try {

            // UserModel.SignUp(name, email, password, type).then((newUser) => {
            //     res.status(201).json({ 'message': 'User Successfully Added', newUser });
            // });

            this.userRespository.SignUp(user).then((newUser) => {
                newUser.password = "hidden";
                res.status(201).json({ 'message': 'User Successfully Added', newUser });
            });

        } catch (error) {
            // console.log(error);
            next(error);
        }
    }

    /*
    signin(req, res) {
        const { email, password } = req.body;
        const user = UserModel.SignIn(email, password);

        if (!user) {
            return res.status(400).json({ "message": `User Doesn't Exist`, 'user': user });
        } else {
            // condition when login in successful
            // 1. create our token - here we define what we want to store in the payload section of our token
            const token = jwt.sign({ 'id': user.id, 'email': user.email, 'name': user.name, 'type': user.type }, "p7tiOCS9eIR0rCeDPi7GzWhc8m7oyoQK", { expiresIn: "12h", });

            // 2. send the token
            // return res.status(200).json({"message":`User Exist`, 'user': user});

            return res.status(200).json({ "message": `User Exist`, 'user': user, 'token': token },)
        }
    }
    */


    /*
     // If we are not using bcrypt 
     signin(req, res, next) {
         try {
             this.userRespository.SignIn(req)
                 .then((user) => {
                     if (!user.name) {
                         return res.status(404).json({ 'message': 'User not found', user });
                     } else {
                         const { id, email, name, type } = user;
 
                         const token = jwt.sign({ 'id': id, 'email': email, 'name': name, 'type': type }, "p7tiOCS9eIR0rCeDPi7GzWhc8m7oyoQK", { expiresIn: "1h", });
 
                         return res.status(201).json({ 'message': 'User found', user, token });
                     }
                 });
         } catch (error) {
             next(error)
         }
     }
    */

    // signin using bcrypt
    async signin(req, res, next) {
        try {
            const user = await this.userRespository.findByEmail(req.body.email);
            if (!user.name) {
                return res.status(404).json({ 'message': 'User not found', user });
            } else {
                try {
                    const result = await compare(req.body.password, user.password);
                    if (result) {

                        const { id, email, name, type } = user;

                        const token = jwt.sign({ 'id': id, 'email': email, 'name': name, 'type': type }, process.env.secretOrPrivateKey, { expiresIn: "1h", });

                        return res.status(201).json({ 'message': 'User found', user, token });

                    } else {

                        return res.status(404).json({ 'message': 'incorrect password', user: [] });
                    }

                } catch (error) {
                    throw new ApplicationError("Password field is empty", 400);
                }
            }
        } catch (error) {
            next(error);
        }
    }
}
