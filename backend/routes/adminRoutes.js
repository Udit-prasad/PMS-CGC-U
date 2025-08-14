const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const {
  getAllAdmins,
  inviteAdmin,
  updateAdmin,
  deleteAdmin,
  changePassword
} = require('../controllers/adminController');

// All routes require authentication
router.use(requireAuth);

// Get all admins (super admin only)
router.get('/admins', requireRole('super_admin'), getAllAdmins);

// Invite new admin (super admin only)
router.post('/invite', requireRole('super_admin'), inviteAdmin);

// Update admin (super admin only)
router.put('/admins/:id', requireRole('super_admin'), updateAdmin);

// Delete admin (super admin only)
router.delete('/admins/:id', requireRole('super_admin'), deleteAdmin);

// Change password (any admin)
router.post('/change-password', changePassword);

module.exports = router;

