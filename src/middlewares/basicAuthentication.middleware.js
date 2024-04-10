import UserModel from "../features/user/models/user.model.js";

export default function basicAuthoriser(req, res, next) {
    // 1. Check if authorization header is empty.

    // console.log(`req.headers = ${req.headers}`);
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ 'message': "No authorization details found" });
    }
    console.log(authHeader);
    // 2. Extract credentials. [Basic qwertyusdfghj345678cvdfgh]
    const base64Credentials = authHeader.replace('Basic ', '');
    console.log(`base64Credentials : ${base64Credentials}`);
    // 3. decode crdentials.

    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf8')
    console.log(`decodedCreds : ${decodedCreds}`); // [username:password]
    const creds = decodedCreds.split(':');
    console.log(`creds: ${creds}`);

    const user = UserModel.getAllUsers().find(u => u.email == creds[0] && u.password == creds[1]);
    if (user) {
        next();
    }
    else {
        return res.status(401).json({ "message": "Invalid Credentials" });
    }

}