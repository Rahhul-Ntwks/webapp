const express = require('express')
const userRouter = express.Router();
console.log("Initializing user routes...");
const {
    createUser,
    updateUser,
    getUser
}
 = require('../controllers/userController')

userRouter.post('/user',createUser);
console.log("User creation route initialized.");
userRouter.get('/user/self',getUser);
userRouter.put('/user/self',updateUser)

module.exports = userRouter;