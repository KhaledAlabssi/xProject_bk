import { signup, login, logout, verifyEmail } from '../controllers/authController.js'
import express from 'express'
const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.post('/verifyEmail', verifyEmail)

export default router

