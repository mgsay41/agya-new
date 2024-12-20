import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  createdAt: { type: Date, default: Date.now },
});

const Report = mongoose.model("Report", ReportSchema);

export default Report;
