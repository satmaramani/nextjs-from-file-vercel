import passport from "passport";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
}