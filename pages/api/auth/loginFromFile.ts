import { findUser } from "../../../lib/users";

import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    console.log(" This is the request method => ", req.method);

    if (req.method?.toLowerCase() !== "post") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email, password } = req.body;

    // Simulate fetching user from file
    const user = findUser(email);
    console.log(" This is the user 1 ", user)

    if (!user) {
        return res.status(401).json({ error: "Invalid email or password 1" });
    }

    if (password != user.password) {
        return res.status(401).json({ error: "Invalid email or password 2" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
    });

    res.status(200).json({ token });
}
