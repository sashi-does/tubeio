import mongoose from "mongoose";

const watchLaterSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    videos: [
        {
            video_id: {type: String, required: true},
            channel_name: {type: String, required: true},
            thumbnail_url: {type: String, required: true},
            title: {type: String, required: true},
            view_count: {type: Number, required: true},
            added_at: {type: Date, default: Date.now},
            published_at: {type: Date, required: true}
        }
    ]   
});
const watchLaterModel = mongoose.models.watchLater || mongoose.model('watchLater', watchLaterSchema);

export default watchLaterModel;