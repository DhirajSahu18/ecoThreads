import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  name: String,
  material: String,
  condition: { type: String, enum: ['good', 'average', 'worn'] },
  image: String,
  pickupAddress: String,
  pickupTime: String,
  type: { type: String, enum: ['recycle', 'upcycle'] },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Request', requestSchema);
