import mongoose from 'mongoose';

const userPreferencesSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    niches: [{type: String, required: true}],
    updated_at: {type: Date, default: Date.now}
});

const userPreferencesModel = mongoose.models('userPreferences') || mongoose.model('userPreferences', userPreferencesSchema);

export default userPreferencesModel;