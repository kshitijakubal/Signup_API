const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signup.controller')

router.post('/',signupController.post_signup);
router.get('/',signupController.get_all_users);
router.get('/:id',signupController.get_user_details)

module.exports = router;