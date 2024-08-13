const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/authMiddleware.ts');
const {getTickets, getTicket, deleteTicket, updateTicket, createTicket} = require('../controllers/ticketController.ts')

router.route('/')
    .get(protect, getTickets)
    .post(protect, createTicket);

router.route('/:id')
    .get(protect, getTicket)
    .delete(protect, deleteTicket)
    .put(protect, updateTicket);

module.exports = router;