import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });


    console.log(" This is the user 1 ", user)

    // if (!user || !bcrypt.compareSync(password, user.password)) {
    if (!user) {
        console.log(" This is the user 2 ", user)
        return res.status(401).json({ error: " Sam Invalid email or password" });
    }

    if (password != user.password) {
        return res.status(401).json({ error: " Sam Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
    });

    res.status(200).json({ token });
}
