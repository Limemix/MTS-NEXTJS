import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
    url: { type: String },
    imagePath: {type: String},
});

const Partner = mongoose.models['partners'] || mongoose.model('partners', partnerSchema);

export default Partner;
