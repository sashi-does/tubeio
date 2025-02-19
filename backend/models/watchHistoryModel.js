import mongoose from 'mongoose'

const watchHistorySchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    videos: [
        {
            video_id: {type: String, required: true},
            watched_at: {type: Date, default: Date.now}
        }
    ]
});

const watchHistoryModel = mongoose.models('watchHistory') || mongoose.model('watchHistory', watchHistorySchema);

export default watchHistoryModel