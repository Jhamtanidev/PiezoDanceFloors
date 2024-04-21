const express = require('express');
const apiController = require('../controllers/apiController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/users/me', authMiddleware, apiController.getUserInfo); 
router.get('/users',authMiddleware, apiController.getUsers);
router.post('/users', authMiddleware, apiController.createUser);
router.put('/users/:id', authMiddleware, apiController.updateUser);
router.delete('/users/:id', authMiddleware, apiController.deleteUser);

module.exports = router;