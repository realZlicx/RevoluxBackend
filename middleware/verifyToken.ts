//verify jwt token middleware to check if the user is logged in
// Path: middleware/verifyToken.ts
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/auth";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization");
        if (!token) throw new Error("NO_TOKEN_PROVIDED");

        const userId = verifyAccessToken(token);
        //verify token
        //if token is valid, set req.user to the user object
        //else throw error
        next();
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "NO_TOKEN_PROVIDED")
                return res.status(401).send({ error: error.message });
            else return res.status(500).send({ error: "Internal server error" });
        } else {
            res.status(500).send({ error: "Internal server error" });
        }
    }
}