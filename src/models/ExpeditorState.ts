import mongoose from 'mongoose';

export const ExpeditorStateShema = new mongoose.Schema({
  order: {
    type: Number,
  },
  address: {
    type: String,
  },
  started: {
    type: String,
  },
});

export default mongoose.model('ExpeditorState', ExpeditorStateShema);
