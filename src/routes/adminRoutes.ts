// src/routes/adminRoutes.ts
import express from 'express';
import { registerAdmin, loginAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin } from '../controllers/admin/adminController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

router.get('/', authenticateToken, getAdmins);
router.get('/:id', authenticateToken, getAdminById);
router.put('/:id', authenticateToken, updateAdmin);
router.delete('/:id', authenticateToken, deleteAdmin);

export default router;
