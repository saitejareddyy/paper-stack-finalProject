import { Router } from 'express'
import { authCheck, login, logout, register } from '../controllers/auth.controller.js';
import { propectedRoute } from '../middlewares/protectedRoute.js';

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/authCheck", propectedRoute, authCheck);

export { authRouter }
