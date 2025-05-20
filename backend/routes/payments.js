const express = require('express');
const router = express.Router();

const { capturePayment, verifyPayment, getPaymentHistory } = require('../controllers/payments');
const { auth, isAdmin, isInstructor, isStudent } = require('../middleware/auth');

router.post('/capturePayment', auth, isStudent, capturePayment);
router.post('/verifyPayment', auth, isStudent, verifyPayment);
router.get('/history', auth, isStudent, getPaymentHistory);

module.exports = router
