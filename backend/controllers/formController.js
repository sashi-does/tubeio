import sql from "../models/userModel.js";
import jwt from "jsonwebtoken";

const updateForm = async (req, res) => {
    try {
        const jwtToken = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
        if (!payload) return res.status(401).json({ message: "Invalid JWT token" });
        
        const id = payload.id
        await sql`UPDATE users SET has_completed_onboarding = true WHERE id = ${id}`;
        res.status(200).json({ message: "Set to True Successfully"});
    }catch(e) {
        res.status(500).json({ message: e.message });
    }
}

const getFormStatus = async (req,res) => {
    try {
        const jwtToken = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
        if (!payload) return res.status(401).json({ message: "Invalid JWT token" });
        
        const id = payload.id
        const formStatus = await sql`SELECT has_completed_onboarding FROM users WHERE id = ${id}`;
        console.log(formStatus)
        res.status(200).json({ form_status: formStatus[0].has_completed_onboarding });
    }catch(e) {
        res.status(500).json({ message: e.message });
    }
}

export { updateForm, getFormStatus };