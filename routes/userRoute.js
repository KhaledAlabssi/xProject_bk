import express from 'express'
import { getProfile, updateProfile, updatePassword } from '../controllers/userController.js'
import { userAuthentication } from '../middleware/authentication.js'
const router = express.Router()


router.route('/profile').get(getProfile)
router.route('/updateProfile').patch(updateProfile)
router.route('/updatePassword').patch(updatePassword)

export default router