import mongoose from "mongoose";

const topArticleSchema = new mongoose.Schema({
  articleID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
});
const TopArticle = mongoose.model("TopArticle", topArticleSchema);

export default TopArticle;
