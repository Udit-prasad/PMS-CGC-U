const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyName: String,
  companyLogo: String,
  companyWebsite: String,  // Add company website field
  position: String,
  jobType: String, // 'Full-time', 'Part-time', 'Internship', 'Contract'
  campusType: {
    type: String,
    enum: ['on-campus', 'off-campus'],
    default: 'off-campus'
  },
  salaryPackage: String,
  location: String,
  applicationDeadline: String,
  jobDescription: String,
  skillsRequired: String,
  selectionProcess: String,
  bondDetails: String,
  benefits: String,
  contactPerson: String,
  contactEmail: String,
  contactPhone: String,
  driveDate: String,
  additionalInfo: String,
  eligibleCourses: [String],
  eligibleYears: [String],
  eligibleBranches: [String],
  // For on-campus jobs: dynamic application form fields
  applicationFormFields: [{
    fieldName: String,
    fieldLabel: String,
    fieldType: {
      type: String,
      enum: ['text', 'email', 'phone', 'textarea', 'select', 'checkbox', 'file'],
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    options: [String], // For select/checkbox fields
    placeholder: String,
    validation: String // Regex pattern or validation rule
  }],
  // For off-campus jobs: external application link
  applicationLink: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
jobSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Job', jobSchema);