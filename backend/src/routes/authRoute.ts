import { Router, Response, Request } from "express";
import passport from "passport";

import { me, signin, signup } from "../controllers/authController";

const router = Router();

router.post("/signin", signin);
router.post("/signup", signup);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    res.redirect("/dashboard"); // Redirect user after login
  }
);

router.get("/logout", (req: Request, res: Response) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
});

router.get("/me", me )

export default router;
