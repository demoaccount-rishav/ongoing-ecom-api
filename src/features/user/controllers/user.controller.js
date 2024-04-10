import UserModel from "../models/user.model.js";

export default class UserController {

    signup(req, res) {
        const { name, email, password, type } = req.body;
        UserModel.SignUp(name, email, password, type);
        res.status(201).json({'message':'User Successfully Added'});
    }

    signin(req, res) {
        const { email, password } = req.body;
        const user = UserModel.SignIn(email, password);

        if (!user) {
            return res.status(400).json({"message":`User Doesn't Exist`, 'user': user});
        } else {
            return res.status(200).json({"message":`User Exist`, 'user': user});
        }
    }


}
