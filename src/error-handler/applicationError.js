export default class ApplicationError extends Error{

    constructor(message, errorCode){
        super(message);
        this.errorCode = errorCode ;
    }
}