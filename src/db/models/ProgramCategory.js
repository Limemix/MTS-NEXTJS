import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String},
    type: { type: String },
    numberOfLessons: { type: String },
    lessonDuration: { type: String },
    courseDuration: { type: String },
    coursePrice: { type: Number },
    imagePath: { type: String },

});

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    description: { type: String},
    imagePath: { type: String },
    programs: [programSchema]
});

const ProgramCategory = mongoose.models['programcategories'] || mongoose.model('programcategories', categorySchema);

export default ProgramCategory;
