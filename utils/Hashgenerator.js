function generateBasicAuthHeader(username, password) {
    const credentials = `${username}:${password}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');
    const authHeader = `Basic ${base64Credentials}`;
    return authHeader;
}
module.exports = generateBasicAuthHeader;