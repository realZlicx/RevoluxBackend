import { Document, ObjectId } from "mongodb";

export interface RegisterBody {
    email: string | undefined;
    username: string | undefined;
    password: string | undefined;
}

export interface LoginBody {
    email: string | undefined;
    password: string | undefined;
}

export interface User {
    email: string;
    username: string;
    password: string;
    createdAt: number;
    updatedAt: number;
    userId: string;
    accessTokenVersion: number;

}

export interface MongoUser extends Document {
    email: string;
    username: string;
    password: string;
    createdAt: number;
    updatedAt: number;
    userId: string;
    accessTokenVersion: number;
    _id: ObjectId;
}

export interface UserAndAccessToken {
    user: User;
    accessToken: string;
}

export type CollectionName = 'users' | 'tracking' | 'sessions';

export type stringOrUndefined = string | undefined;