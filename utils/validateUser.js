const bcrypt = require('bcryptjs');
const User = require('../models/user');

const validateUser = async (authorizationHeader) => {
    try {
        const base64Credentials = authorizationHeader.split(' ')[1];
        const userCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        const [username, password] = userCredentials.split(':');
        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            return {
                success: false,
                username: username
            };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        return {
            success: passwordMatch,
            username: username
        };;

    } catch (error) {
        console.error('Error while validating user:', error);
        return {
            success: false,
            username: username
        };
    }
};

module.exports = validateUser;
