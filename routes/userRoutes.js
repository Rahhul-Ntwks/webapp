const express = require('express')
const userRouter = express.Router();
const {
    createUser,
    updateUser,
    getUser
}
 = require('../controllers/userController')

userRouter.post('/user',createUser);
userRouter.get('/user/self',getUser);
userRouter.put('/user/self',updateUser)

module.exports = userRouter;