import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 60 },
  body: { type: String, required: true, trim: true, maxlength: 500 },
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
  dislikedBy: { type: Array, default: []},
  isEdited: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema);