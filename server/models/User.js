import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
   role: { type: String, enum: ['user', 'admin'], default: 'user' },
  password: String
});

export default mongoose.model('User', userSchema);
