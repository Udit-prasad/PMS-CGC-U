const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jobController = require('../controllers/jobControllers');
<<<<<<< HEAD

const router = express.Router();

// Local storage configuration
=======
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Ensure uploads directory exists
>>>>>>> origin/job-fetching-fix
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory');
}

<<<<<<< HEAD
const uploadStorage = multer.diskStorage({
=======
// Multer setup for file uploads
const storage = multer.diskStorage({
>>>>>>> origin/job-fetching-fix
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
<<<<<<< HEAD
=======
    // Generate unique filename
>>>>>>> origin/job-fetching-fix
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
<<<<<<< HEAD
console.log('📁 Using local storage for image uploads');

// Configure multer with the selected storage
const upload = multer({ 
  storage: uploadStorage,
=======

// Add file filtering and size limits
const upload = multer({ 
  storage,
>>>>>>> origin/job-fetching-fix
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
  }
});

<<<<<<< HEAD
// Job routes
router.get('/', jobController.getAllJobs);
router.post('/', upload.single('companyLogo'), jobController.createJob);
router.put('/:id', upload.single('companyLogo'), jobController.updateJob);
router.delete('/:id', jobController.deleteJob);
=======
// Public routes (read-only)
router.get('/', jobController.getAllJobs);

// Protected routes (admin only)
router.post('/', requireAuth, requireAdmin, upload.single('companyLogo'), jobController.createJob);
router.put('/:id', requireAuth, requireAdmin, upload.single('companyLogo'), jobController.updateJob);
router.delete('/:id', requireAuth, requireAdmin, jobController.deleteJob);
>>>>>>> origin/job-fetching-fix

module.exports = router;