import express from 'express';
const router = express.Router();
import { body } from 'express-validator';
import { registerUser, loginUser, getUser } from '../controllers/auth.js'
import fetchuser from '../middleware/fetchuser.js';

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

export default router