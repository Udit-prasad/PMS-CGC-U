const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicantName: {
    type: String,
    required: true
  },
  applicantEmail: {
    type: String,
    required: true
  },
  applicantPhone: {
    type: String,
    required: true
  },
  applicantCourse: {
    type: String,
    required: true
  },
  applicantYear: {
    type: String,
    required: true
  },
  applicantBranch: {
    type: String,
    required: true
  },
  // Dynamic form responses
  formResponses: [{
    fieldName: String,
    fieldLabel: String,
    fieldType: String,
    response: mongoose.Schema.Types.Mixed, // Can be string, array, or file path
    filePath: String // For file uploads
  }],
  // Application status
  status: {
    type: String,
    enum: ['pending', 'shortlisted', 'interviewed', 'selected', 'rejected'],
    default: 'pending'
  },
  // Admin notes
  adminNotes: String,
  // Timestamps
  appliedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
applicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
applicationSchema.index({ jobId: 1, status: 1 });
applicationSchema.index({ applicantEmail: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
