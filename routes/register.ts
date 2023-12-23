import { Request, Response } from "express";
import { RegisterBody, User, UserAndAccessToken } from "../types/models";
import { getCollection } from "../database";
import {
    checkEmailAndUsernameAvailability,
    validateRegisterFormData,
} from "../utils/auth";
import generateUser from "../utils/generators/generateUser";
import { handleError } from "../utils/handlers/error";

export default async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body as RegisterBody;
        const users = getCollection("users");
        await validateRegisterFormData(email, username, password);
        await checkEmailAndUsernameAvailability(email, username, users);

        const { user, accessToken }: UserAndAccessToken = await generateUser(email, username, password);

        const result = await users.insertOne(user);
        if (result.acknowledged) {
            res.status(201).send({ accessToken, user: user as User });
        } else {
            throw new Error("INTERNAL_SERVER_ERROR");
        }
    } catch (error) {
        if (error instanceof Error) handleError(error, res);
        else res.status(500).send({ error: "Internal server error" });
    }
};