import { MongoClient, Db, Collection } from 'mongodb';
import { CollectionName } from '../types/models';

let database: Db;

export const connectDatabase = async (callback: Function) => {
    const url = process.env.MONGO;
    if (!url) {
        throw new Error('Missing MONGO environment variable');
    }
    const client = new MongoClient(url);
    await client.connect();
    database = client.db();
    console.log('Database connected successfully');
    // Call the callback function passed to connectDatabase once the connection is established
    callback();
}

export const getDatabase = () => {
    if (!database) {
        throw new Error('Call connectDatabase first');
    } else {
        return database;
    }
}

export const getCollection = (collectionName: CollectionName): Collection => {
    return getDatabase().collection(collectionName);
}