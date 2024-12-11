import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

const usersFilePath = path.join(process.cwd(), "data/users.json");

type User = {
    email: string;
    password: string;
};

export function readUsers(): User[] {
    const fileData = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(fileData) as User[];
}

export function addUser(email: string, password: string) {
    const users = readUsers();
    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ email, password: hashedPassword });
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

export function findUser(email: string): User | undefined {
    const users = readUsers();

    console.log(" This is the email ID :", email)
    return users.find((user) => user.email === email);
}