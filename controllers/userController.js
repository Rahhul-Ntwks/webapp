const User = require('../models/user');
const bcrypt = require('bcryptjs');
const validateUser = require('../utils/validateUser');
const { DataTypes} = require('sequelize');
const logger = require('../logger')
const publishVerificationMessage = require('../pubsub')
const { v4: uuidv4 } = require('uuid');

async function createUser(req,res){
    try{
        logger.info('Received createUser request ',(req.body))
        const acceptHeader = req.get('Accept');
        if (acceptHeader && !acceptHeader.includes('application/json')) {
            logger.error('Invalid accept header received');
            return res.status(406).send('Only JSON responses are accepted.');
        }
        const { first_name, last_name, username, password } = req.body;
        const authorisedfields= ['first_name', 'last_name', 'password','username']
        const UnallowedFields = Object.keys(req.body).filter(field => !authorisedfields.includes(field))
        const allowedFields = Object.keys(req.body).filter(field => authorisedfields.includes(field))
        if(UnallowedFields.length > 0 ||allowedFields.length != authorisedfields.length){
            logger.error('wrong fields inputed',UnallowedFields)
           return res.status(400).json({error : 'wrong input fields, cant update'})
        }
        if(!password || !username || !first_name || !last_name){
            logger.error('user details are wrong')
            return res.status(400).json();
        }
        const existUser = await User.findOne({where : {username}});
        if(existUser){
            logger.error('user already exists',req.body)
            return res.status(400).json({error : 'user already exists'})
        }
        const passwordHash = await bcrypt.hash(password,10)
        const email_token = uuidv4();
        const user = await User.create({
            first_name : first_name,
            last_name :last_name,
            username : username,
            password : passwordHash,
            email_token : email_token
        })

        publishVerificationMessage(username,email_token,first_name,last_name)
        const userJson = user.toJSON();
        delete userJson.password;

        logger.info('user created successfully',userJson)
        return res.status(201).json(userJson)

    } catch(error){
        logger.error('Error occurred while creating user', { error: error.message });
        res.status(400).json({ error: error.message });

    }
}
async function updateUser(req,res){
    try{
        logger.info('Received updateUser request', req.body);
        const authorizationHeader = req.headers['authorization'];
        const acceptHeader = req.get('Accept');
        if (acceptHeader && !acceptHeader.includes('application/json')) {
            logger.error('only JSON responses are accepted')
            return res.status(406).send('Only JSON responses are accepted.');
        }
        const validatedUser = await validateUser(authorizationHeader)
        if(!(await validatedUser).success){
            logger.error('user unauthorized',validatedUser)
            return res.status(401).json({error : 'user unauthorized'})
        }
        const authorisedfields= ['first_name', 'last_name', 'password']
        const UnallowedFields = Object.keys(req.body).filter(field => !authorisedfields.includes(field))
        if(UnallowedFields.length > 0){
            logger.error('user unauthorized',UnallowedFields)
           return res.status(400).json({error : 'wrong input fields, cant update'})
        }
        var updatedData = {...req.body}
        if(req.body.password){
        const body = {...req.body};
        const passwordHash = await bcrypt.hash(req.body.password,10)
        body.password = passwordHash
        body.account_updated = Date.now()
         const updatedData1 = await User.update(body, {
            where: {
              username: validatedUser.username
            }
          });
        }else {
             updatedData = {...req.body}
             updatedData.account_updated=Date.now()
             const updatedData1 = await User.update(updatedData, {
                where: {
                  username: validatedUser.username
                }
              });
        }

        
        const user = await User.findOne({ where: { username: validatedUser.username } });
        const updatedDataJson = user.toJSON();
        delete updatedDataJson.password
        logger.info('user info updated succesfully',updatedDataJson)
        return res.status(204).json()

    }catch(error) {
        logger.error('Error occurred while updating user', { error: error.message });
        res.status(400).json({ error: 'Forbidden' });
    }

}
async function getUser(req,res){
    try{
        logger.info('Received getUser request');
     const authorizationHeader = req.headers['authorization'];

     const acceptHeader = req.get('Accept');
        if (acceptHeader && !acceptHeader.includes('application/json')) {
            logger.error('only JSON responses are accepted')
            return res.status(406).send('Only JSON responses are accepted.');
        }
     if((parseInt(req.headers['content-length']) > 0) || Object.keys(req.body).length>0 || (Object.keys(req.query).length > 0)){
        return res.status(400).header('Cache-Control', 'no-cache, no-store, must-revalidate').json();
      }
        const validatedUser = await validateUser(authorizationHeader)
        if(!(await validatedUser).success){
            logger.error('user unauthorized',validatedUser)
            res.status(401).json({error : 'user unauthorized'})
        }
        const userData = await User.findOne({ where: { username: validatedUser.username } });
        const userDataJson = userData.toJSON()
        delete userDataJson.password
        logger.info("got the user info",userDataJson)
        res.status(200).json(userDataJson)
    }
    catch(error){
        logger.error('Error occurred while fetching user', { error: error.message });
        res.status(400).json()

    }

}
async function verifyUser(req,res){
    const userData = await User.findOne({ where: { email_token: req.params.token } });
    const emailSentTime = userData.email_sent_time
    const currentTime = new Date();
    const timeDifference = currentTime - emailSentTime;
    const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);
    let account_verified = null
    let email_verified_time = null
    if (timeDifferenceInSeconds > 120) {
        account_verified = false
        logger.error('user authentication failed.it crossed 120 seconds')
    } else {
        account_verified = true
        email_verified_time = currentTime
    logger.info('user authentication successful, user registered')
    }
    let timeupdates = {
        verified : account_verified,
        verified_time : email_verified_time
    }
    const updatedData1 = await User.update(timeupdates, {
        where: {
            token: req.token
        }
    });
    res.status(200).json()
}


module.exports = {
    createUser,
    updateUser,
    getUser,
    verifyUser
}
