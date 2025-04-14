import express from 'express';
import {
  submitRequest,
  getUserRequests,
  getAllRequestsWithStats,
  updateRequestStatus
} from '../controllers/requestController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, submitRequest);
router.get('/user', verifyToken, getUserRequests);
router.get('/all', verifyToken, getAllRequestsWithStats);
router.put('/:id/status', verifyToken, updateRequestStatus);

export default router;
