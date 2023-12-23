import { Router } from "express";
import register from "../routes/register";
import login from "../routes/login";

const router: Router = Router();

router.post('/register', register)
router.post('/login', login)

export default router;
