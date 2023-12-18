import { Router } from "express";
import test from "../routes/test.js";

const router = Router();

router.get("/", (req, res) => {
  res.send(" Api Server is running");
});

router.get("/test", test);

export default router;
