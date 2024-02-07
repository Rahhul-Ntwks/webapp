const checkJsonHeader = (req, res, next) =>{
    const acceptHeader = req.get('Accept');
    if (acceptHeader && !acceptHeader.includes('application/json')) {
        return res.status(406).send('Only JSON responses are accepted.');
      }
    next();
}
module.exports = checkJsonHeader;