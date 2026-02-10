const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerUser, loginUser, getUser } = require('../controllers/auth')
const fetchuser = require('../middleware/fetchuser');

//ROUTE 1: create user with post method
router.post('/register', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
],
    registerUser
)

//ROUTE 2: authenticate user while login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
],
    loginUser
)

// ROUTE 3: Get logged-in user details
router.post('/getuser', fetchuser, getUser);

module.exports = router