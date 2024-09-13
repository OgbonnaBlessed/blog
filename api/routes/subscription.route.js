import express from 'express';
import { subscribeUser } from '../controllers/subscription.controller.js';

const router = express.Router();

// POST route to handle subscription
router.post('/subscribe', subscribeUser);

export default router;