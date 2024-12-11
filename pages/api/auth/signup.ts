import { NextApiRequest, NextApiResponse } from "next";
import { addUser } from "../../../lib/users"; // Utility function to save users

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        addUser(email, password); // Add user to the file or database
        return res.status(201).json({ message: "User created successfully!" });
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
