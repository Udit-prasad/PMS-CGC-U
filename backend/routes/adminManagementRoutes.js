const express = require('express');
const router = express.Router();
const adminContoller = require('../controllers/adminContoller');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// Get all admins (super admin only)
router.get('/admins', requireAuth, requireAdmin, adminContoller.getAllAdmins);

// Invite new admin (super admin only)
router.post('/invite', requireAuth, requireAdmin, adminContoller.inviteAdmin);

// Update admin (super admin only)
router.put('/update/:id', requireAuth, requireAdmin, adminContoller.updateAdmin);

// Delete admin (super admin only)
router.delete('/delete/:id', requireAuth, requireAdmin, adminContoller.deleteAdmin);

// Change password (any admin)
router.put('/change-password', requireAuth, requireAdmin, adminContoller.changePassword);

module.exports = router;
