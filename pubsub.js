const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();
const logger = require('./logger')
const publishVerificationMessage = async (email, token, firstname,last_name) => {
    const topicName = 'projects/dev-project-414806/topics/verify_email';
    const payload = { email, token, firstname,last_name }
    const dataBuffer = Buffer.from(JSON.stringify(payload));
    const message = {
        data: dataBuffer,
    };

    try {
        await pubsub.topic(topicName).publishMessage(message);
        logger.info(`Message published to topic ${topicName}`);
    } catch (error) {
        logger.error(`Error publishing message to topic ${topicName}`);
    }
}
module.exports = 
    publishVerificationMessage
