import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import db from "@/db/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    // Check if user with the provided email already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    try {
      // Create the new user in the database
      const newUser = await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to register user", error: error.message });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
