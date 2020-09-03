import mongoose from 'mongoose';

export const ExpeditorShema = new mongoose.Schema({
  onBreak: {
    type: Boolean,
  },
  firstTake: {
    type: String,
  },
  transport: {
    type: String,
  },
  confidence: {
    type: Number,
  },
  fullName: {
    type: String,
  },
  phone: {
    type: String,
  },
  state: {
    type: [mongoose.Types.ObjectId],
    ref: 'ExpeditorState',
  },
});

export default mongoose.model('Expeditor', ExpeditorShema);
