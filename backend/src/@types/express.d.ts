import { Request } from "express";
import { IUser } from "../../models/User";

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}
