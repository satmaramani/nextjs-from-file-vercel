import passport from "passport";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    passport.authenticate("facebook", {
        successRedirect: "/protected",  // Redirect to protected page if successful
        failureRedirect: "/login",      // Redirect to login page if failed
    })(req, res);
}