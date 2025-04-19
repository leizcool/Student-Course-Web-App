const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  phoneNumber: { type: String },
  email: { type: String, required: true, unique: true },
  program: { type: String },
  favoriteTopic: { type: String },
  strongestSkill: { type: String },
});

module.exports = mongoose.model('Student', studentSchema);
