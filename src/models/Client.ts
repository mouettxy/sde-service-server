import mongoose from 'mongoose';
import { paymentShema, freeShema, automatedShema } from './sharedSubShemas';

export const ClientShema = new mongoose.Schema({
  payment: paymentShema,
  free: freeShema,
  automated: automatedShema,
  addresses: {
    type: mongoose.Types.ObjectId,
    ref: 'ClientAddresses',
  },
  orders: {
    type: mongoose.Types.ObjectId,
    ref: 'ClientOrders',
  },
  identifier: {
    type: Number,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  attracted: {
    type: String,
  },
  rate: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  food: {
    type: Boolean,
  },
  isPriorityDelivery: {
    type: Boolean,
  },
  isStoppedDelivery: {
    type: Boolean,
  },
});

export default mongoose.model('Client', ClientShema);
