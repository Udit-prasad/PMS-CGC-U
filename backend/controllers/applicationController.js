const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');

// Submit application
exports.submitApplication = async (req, res) => {
  try {
    const { jobId, formResponses } = req.body;
    const studentId = req.user._id;
    const application = new Application({
      job: jobId,
      student: studentId,
      formResponses,
    });
    await application.save();
    res.status(201).json({ message: 'Application submitted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get applications for a job (admin)
exports.getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ job: jobId }).populate('student');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update application status (admin)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, notes } = req.body;
    const application = await Application.findById(applicationId);
    if (!application) return res.status(404).json({ error: 'Application not found.' });
    application.status = status;
    application.notes = notes || application.notes;
    await application.save();
    res.json({ message: 'Application status updated.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get applications for a student
exports.getApplicationsByStudent = async (req, res) => {
  try {
    const studentId = req.user._id;
    const applications = await Application.find({ student: studentId }).populate('job');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
