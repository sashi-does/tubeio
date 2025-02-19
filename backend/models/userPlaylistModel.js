import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    title: {type: String, required: true},
    videos: [
        {
            video_id: {type: String, required: true},
            added_at: {type: Date, default: Date.now}
        }
    ],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});


const userPlaylistModel = mongoose.models('userPlaylist') || mongoose.model('userPlaylist', playlistSchema);

export default userPlaylistModel;
