import { MongoClient } from "mongodb";

const url = `mongodb://127.0.0.1:27017/`;
let instanceDB = null;

export function connectToMongoDB() {
    MongoClient.connect(url)
        .then((client) => {
            instanceDB = client.db('ecomdb');
            console.log(`**** Connected to MongDB server !! ****`);
        })
}

export function getDb() {
    return instanceDB;
}