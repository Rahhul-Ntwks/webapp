const User = require('../models/user');
const bcrypt = require('bcryptjs');
const validateUser = require('../utils/validateUser');
const { DataTypes} = require('sequelize');
const logger = require('../logger')

async function createUser(req,res){
    try{
        logger.info('Received createUser request', { request: req.body });
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
           return res.status(400).json({error : 'wrong input fields, cant update'})
        }
        if(!password || !username || !first_name || !last_name){
            return res.status(400).json();
        }
        const existUser = await User.findOne({where : {username}});
        if(existUser){
            return res.status(400).json({error : 'user already exists'})
        }
        const passwordHash = await bcrypt.hash(password,10)
        const user = await User.create({
            first_name : first_name,
            last_name :last_name,
            username : username,
            password : passwordHash
        })
        const userJson = user.toJSON();
        delete userJson.password;
        return res.status(201).json(userJson)

    } catch(error){
        logger.error('Error occurred while creating user', { error: error.message });
        res.status(400).json({ error: error.message });

    }
}
async function updateUser(req,res){
    try{
        logger.info('Received updateUser request', { request: req.body });
        const authorizationHeader = req.headers['authorization'];
        const acceptHeader = req.get('Accept');
        if (acceptHeader && !acceptHeader.includes('application/json')) {
            return res.status(406).send('Only JSON responses are accepted.');
        }
        const validatedUser = await validateUser(authorizationHeader)
        if(!(await validatedUser).success){
            return res.status(401).json({error : 'user unauthorized'})
        }
        const authorisedfields= ['first_name', 'last_name', 'password']
        const UnallowedFields = Object.keys(req.body).filter(field => !authorisedfields.includes(field))
        if(UnallowedFields.length > 0){
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
            return res.status(406).send('Only JSON responses are accepted.');
        }
     if((parseInt(req.headers['content-length']) > 0) || Object.keys(req.body).length>0 || (Object.keys(req.query).length > 0)){
        return res.status(400).header('Cache-Control', 'no-cache, no-store, must-revalidate').json();
      }
        const validatedUser = await validateUser(authorizationHeader)
        if(!(await validatedUser).success){
            res.status(401).json({error : 'user unauthorized'})
        }
        const userData = await User.findOne({ where: { username: validatedUser.username } });
        const userDataJson = userData.toJSON()
        delete userDataJson.password
        res.status(200).json(userDataJson)
    }
    catch(error){
        logger.error('Error occurred while fetching user', { error: error.message });
        res.status(400).json()

    }

}

module.exports = {
    createUser,
    updateUser,
    getUser
}
