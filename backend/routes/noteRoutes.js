const express = require('express');
const router = express.Router({mergeParams: true});
const {getNotes, addNote} = require('../controllers/noteController.ts');

const {protect} = require('../middleware/authMiddleware.ts');

router.route('/').get(protect, getNotes).post(protect, addNote);

module.exports = router;

///api/tickets/:ticketId/notes