const express = require('express')
const userRouter = express.Router();
const userController = require('../controllers/userController')

userRouter.post('/user',userController);
userRouter.get('/user/self',userController);
userRouter.put('/user/self',userController)