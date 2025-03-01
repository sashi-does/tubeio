import sql from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });



const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) return res.status(400).json({ message: "Username is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });

    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length !== 0) return res.status(409).json({ message: "Email already exists" });

    const hashedPassword = await hashPassword(password);
    await sql`INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${hashedPassword})`;

    const newUser = await sql`SELECT id FROM users WHERE email = ${email}`;
    const token = createToken(newUser[0].id);

    res.status(201).json({ message: "Created Successfully", token });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });

    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) return res.status(401).json({ message: "Email not found" });

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect Password" });

    const token = createToken(user[0].id);
    res.status(200).json({ message: "Login Successful", token });
  } catch (e) {
    console.error("Login Error:", e); 
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export { createUser, loginUser };
