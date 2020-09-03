import mongoose from 'mongoose';
import { clientOrderShema } from './sharedSubShemas';

export const clientOrdersShema = new mongoose.Schema({
  addresses: [clientOrderShema],
});

export default mongoose.model('clientOrders', clientOrdersShema);
