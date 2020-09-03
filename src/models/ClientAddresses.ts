import mongoose from 'mongoose';
import { clientAddressShema } from './sharedSubShemas';

export const ClientAddressesShema = new mongoose.Schema({
  addresses: [clientAddressShema],
});

export default mongoose.model('ClientAddresses', ClientAddressesShema);
