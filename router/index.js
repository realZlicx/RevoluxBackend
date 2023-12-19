import { Router } from "express";
import test from "../routes/test.js";
import register from "../routes/register.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("Api Server is running");
});

router.get("/test", test);

router.post("/register", register);

export default router;
