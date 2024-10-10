import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  name: { type: String },
  shortAddress: { type: String },
  fullAddress: { type: String },
  description: { type: String },
  imagePath: { type: String },
});

const News = mongoose.models['news'] || mongoose.model('news', newsSchema);

export default News;
