import jwt from 'jsonwebtoken'

export default function jwtAuthorizer(req, res, next) {

    // 1. Receive the token - make changes in postman where authorisation type set to API key - key : authorization, value : token created using jwt.signin() in user model.SignIn

    const token = req.headers.authorization;

    // 2. If no token, returns the error
    if (!token) {
        return res.status(401).json({ 'message': "No authorization details found" });
    }

    // 3. Check if the token is valid
    else {
        try {

            const token_payload = jwt.verify(token, "p7tiOCS9eIR0rCeDPi7GzWhc8m7oyoQK");

            if (token_payload) {
                next();
            }

        } catch (error) {
            return res.status(401).json({ 'message': ["Invalid Token", "No authorization details found"] });
        }
    }


}