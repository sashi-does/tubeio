import watchLaterModel from "../models/watchLaterModel.js";
import jwt from "jsonwebtoken";

const addToWatchLater = async (req, res) => {
    try {
      const { video_id, channel_name, thumbnail_url, title, view_count, published_at } = req.body;
  
      if (!video_id || !channel_name || !thumbnail_url || !title || !view_count || !published_at) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const jwtToken = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(jwtToken, process.env.JWT_SECRET);
  
      const userWatchLater = await watchLaterModel.findOne({ user_id: id });
  
      if (!userWatchLater) {
        const newUserWatchLater = new watchLaterModel({
          user_id: id,
          videos: [
            {
              video_id,
              channel_name,
              thumbnail_url,
              title,
              view_count,
              added_at: new Date(), 
              published_at: new Date(published_at), 
            },
          ],
        });
  
        await newUserWatchLater.save();
        return res.status(201).json({ message: "Video added to watch later" });
      } else {
        const videoExists = userWatchLater.videos.find(
          (video) => video.video_id === video_id
        );
  
        if (videoExists) {
          return res.status(400).json({ message: "Video already exists in watch later" });
        } else {
          userWatchLater.videos.push({
            video_id,
            channel_name,
            thumbnail_url,
            title,
            view_count,
            added_at: new Date(), 
            published_at: new Date(published_at), 
          });
  
          await userWatchLater.save();
          return res.status(201).json({ message: "Video added to watch later" });
        }
      }
    } catch (e) {
      console.error("Error in addToWatchLater:", e);
      res.status(500).json({ message: e.message });
    }
  };

const removeFromWatchLater = () => {};

const clearWatchLater = () => {};

const showAllWatchLater = async (req,res) => {
  try {
    const jwtToken = req.headers.authorization.split(" ")[1];
    const id = jwt.verify(jwtToken, process.env.JWT_SECRET).id;
    const user = await watchLaterModel.findOne({ user_id: id });
    if (!user) {
      return res.status(404).json({ message: "No videos found in watch later" });
    } else {
      return res.status(200).json({ videos: user.videos });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export { addToWatchLater, removeFromWatchLater, clearWatchLater, showAllWatchLater };
