const express = require('express')
const userRouter = express.Router();
const {
    createUser,
    updateUser,
    getUser,
    verifyUser
}
 = require('../controllers/userController')

userRouter.post('/user',createUser);
userRouter.get('/user/self',getUser);
userRouter.put('/user/self',updateUser)
userRouter.get('/verify/:token',verifyUser)

module.exports = userRouter;