import { MongoClient } from "mongodb";

const url = process.env.connectionString;
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