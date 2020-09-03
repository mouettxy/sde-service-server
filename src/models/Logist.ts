import mongoose from 'mongoose';

//! --------------------------------------------------------------------------
//!                                     WIP
//! --------------------------------------------------------------------------

export const LogistShema = new mongoose.Schema({
  fullName: {
    type: String,
  },
});

export default mongoose.model('Logist', LogistShema);
