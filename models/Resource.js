const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },

  description: String,

  category: {
    type: String,
    enum: ['Engineering', 'Medical', 'Govt Exams', 'Other'],
    required: true
  },

  resourceUrl: { type: String, required: true },

  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  isApproved: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
