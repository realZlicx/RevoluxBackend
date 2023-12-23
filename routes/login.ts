import { Request, Response } from "express";
import { handleError } from "../utils/handlers/error";
import { LoginBody } from "../types/models";
import { getCollection } from "../database";
import { comparePassword, validateLoginFormData } from "../utils/auth";
import { retriveUser } from "../utils/retrivers";

export default async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as LoginBody;
        const users = getCollection("users");
        await validateLoginFormData(email, password);
        const user = await retriveUser(email, users);
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) throw new Error("INVALID_PASSWORD");

    } catch (error) {
        if (error instanceof Error) handleError(error, res);
        else res.status(500).send({ error: "Internal server error" });
    }
};