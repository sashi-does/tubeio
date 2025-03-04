import userPreferencesModel from "../models/userPreferencesModel.js";
import jwt from 'jsonwebtoken';

const addNiche = async (req, res) => {
    const niches = req.body.niches;
    console.log(niches)
    console.log(req.headers);
    console.log("sashi");

    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }

    const token = req.headers.authorization.split(" ")[1];
    console.log(token + " sasji ")

    if (!token) {
        return res.status(401).json({ message: "JWT token is missing" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const updated_at = Date.now();
        const newNiche = new userPreferencesModel({ user_id: payload.id, niches, updated_at });

        await newNiche.save();
        res.status(201).json({ message: "Niche added successfully" });
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid JWT token" });
        }
        res.status(500).json({ message: e.message });
    }
};

const updateNiches = (req,res) => {}

const getNiches = async (req,res) => {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const id = jwt.verify(token, process.env.JWT_SECRET).id;
    console.log(id)
    const user = await userPreferencesModel.findOne({user_id: id});
    console.log(user);
    res.status(200).json({niches: user.niches });
}

const updateTheme = () => {}



export {addNiche, updateNiches, getNiches, updateTheme};