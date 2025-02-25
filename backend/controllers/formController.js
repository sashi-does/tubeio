import sql from "../models/userModel.js";

const updateForm = async (req, res) => {
    try {
        await sql`UPDATE users SET has_completed_onboarding = true WHERE id = ${req.form.id}`;
        res.status(200).json({ message: "Updated Successfully"});
    }catch(e) {
        res.status(500).json({ message: e.message });
    }
}

export default updateForm;