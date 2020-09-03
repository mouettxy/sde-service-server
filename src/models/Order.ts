import mongoose from 'mongoose';
import { payShema, orderShema, timeShema } from './sharedSubShemas';

export const OrderShema = new mongoose.Schema({
  identifier: {
    type: Number,
  },
  status: {
    type: String,
  },
  client: {
    type: mongoose.Types.ObjectId,
    ref: 'Client',
  },
  pay: payShema,
  order: orderShema,
  time: timeShema,
});

export default mongoose.model('Order', OrderShema);
