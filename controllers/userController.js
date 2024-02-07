const User = require('../models/user');
console.log("Initializing user controller...");
const bcrypt = require('bcryptjs');
const validateUser = require('../utils/validateUser');
const { DataTypes} = require('sequelize');

async function createUser(req,res){
    try{
        console.log("Received request to create a new user.");
        console.log(req.body);
        const { first_name, last_name, username, password } = req.body;
        if(!password || !username){
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
        res.status(500).json({ error: 'Internal Server Error', details: error });

    }
}
async function updateUser(req,res){
    try{
        const authorizationHeader = req.headers['authorization'];
        const validatedUser = await validateUser(authorizationHeader)
        if(!(await validatedUser).success){
            return res.status(401).json({error : 'user unauthorized'})
        }
        const authorisedfields= ['first_name', 'last_name', 'password']
        const UnallowedFields = Object.keys(req.body).filter(field => !authorisedfields.includes(field))
        if(UnallowedFields.length > 0){
           return res.status(400).json({error : 'wrong input fields, cant update'})
        }
        
        const passwordHash = await bcrypt.hash(req.body.password,10)
        const updatedData = {...req.body}
        updatedData.password = passwordHash

        const updatedData1 = await User.update({ updatedData,account_updated : Date.now() }, {
            where: {
              username: validatedUser.username
            }
          });
        const user = await User.findOne({ where: { username: validatedUser.username } });
        const updatedDataJson = user.toJSON();
        delete updatedDataJson.password
        return res.status(200).json(updatedDataJson)

    }catch(error) {
        res.status(403).json({ error: 'Forbidden' });
    }

}
async function getUser(req,res){
    try{
     const authorizationHeader = req.headers['authorization'];
        const validatedUser = validateUser(authorizationHeader)
        if(!validatedUser){
            res.status(401).json({error : 'user unauthorized'})
        }
        const userData = await User.findOne({ where: { username: req.body.username } });
        delete userData.password
        res.status(200).json({userData})
    }
    catch(error){
        res.status(403).json('unable to fetch data')
    }

}

module.exports = {
    createUser,
    updateUser,
    getUser
}
