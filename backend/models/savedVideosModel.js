import mongoose from 'mongoose';

const savedVideosSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    videos: [
        {
            video_id: {type: String, required: true},
            saved_at: {type: Date, default: Date.now}
        }
    ]
});

const savedVideosModel = mongoose.models('savedVideos') || mongoose.model('savedVideos',savedVideosSchema);

export default savedVideosModel;