import userPreferencesModel from "../models/userPreferencesModel.js";
import jwt from 'jsonwebtoken';

// const addNiche = async (req,res) => {
//     const niches = req.body.niches;
//     console.log("sashi")
//     console.log(req.headers);
//     console.log("sashi")
//     const payload = jwt.verify(req.headers.authorization?.split(" ")[1], process.env.JWT_SECRET);

//     console.log(payload)
//     const updated_at = Date.now();
//     const newNiche = new userPreferencesModel({user_id: payload.id,niches,updated_at});
//     try {
//         await newNiche.save();
//         res.status(201).json({message: "Niche added successfully"});    
//     } catch (e) {
//         res.status(500).json({message: e.message});
//     }
// }
const addNiche = async (req, res) => {
    const niches = req.body.niches;
    console.log(niches)
    console.log(req.headers);
    console.log("sashi");

    // Check if the Authorization header is present
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }

    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    console.log(token + " sasji ")

    // Check if the token is present
    if (!token) {
        return res.status(401).json({ message: "JWT token is missing" });
    }

    try {
        // Verify the token
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);

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

const removeNiche = () => {}

const getNiches = () => {}

const updateTheme = () => {}

export {addNiche, removeNiche, getNiches, updateTheme};