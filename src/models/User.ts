import mongoose from 'mongoose';
import { permissionsShema } from './sharedSubShemas';

export const UserShema = new mongoose.Schema({
  login: {
    type: String,
  },
  password: {
    type: String,
  },
  defaultPassword: {
    type: String,
  },
  jwt: {
    type: String,
  },
  region: {
    type: String,
  },
  permissions: permissionsShema,
  linkedTo: {
    type: mongoose.Types.ObjectId,
    ref: 'roleModel',
  },
});

export default mongoose.model('User', UserShema);
