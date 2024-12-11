import passport from "passport";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    passport.authenticate("facebook", {
        successRedirect: "/protected", // Redirect to the protected page on success
        failureRedirect: "/login",    // Redirect to the login page on failure
    })(req, res);
}