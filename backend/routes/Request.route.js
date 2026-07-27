// routes/request.route.js
import express from "express";
import {sendRequest,getSentRequests,getReceivedRequests,updateRequestStatus,deleteRequest,checkRequestStatus,} from '../controllers/Request.controller.js';

const router = express.Router();

import protectRoute from'../middleware/auth.middleware.js'; 
// Send a request
router.post('/send', protectRoute, sendRequest);

// Get all sent requests of the logged-in user
router.get('/sent', protectRoute, getSentRequests);

// Get all received requests of the logged-in user
router.get('/received', protectRoute, getReceivedRequests);

// Accept or reject a request
router.patch('/update/:requestId', protectRoute, updateRequestStatus);

// Cancel / delete a pending request
router.delete('/delete/:requestId', protectRoute, deleteRequest);

// Check if a request exists between the logged-in user and another user
router.get('/check/:receiverId', protectRoute, checkRequestStatus);

export default router;