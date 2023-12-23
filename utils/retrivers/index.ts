import { Collection } from "mongodb";
import { MongoUser, stringOrUndefined } from "../../types/models";



export const retriveUser = async (email: stringOrUndefined, collection: Collection): Promise<MongoUser> => {
    const user = await collection.findOne({ email }) as MongoUser;
    if (!user) throw new Error("USER_NOT_FOUND");
    return user;
};