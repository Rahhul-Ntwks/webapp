const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {testConnection,sequelize} = require('./config/dbconfig');
const userRouter  = require('./routes/userRoutes')
const logger = require('./logger')

//const checkJsonHeader = require('./utils/checkJsonHeader')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(checkJsonHeader)


app.use('/v1',userRouter);
app.all('/healthz',async (req,res) => {
  if(req.method != "GET"){
    return res.status(405).header('Cache-Control', 'no-cache, no-store, must-revalidate').json();
  } 
  if((parseInt(req.headers['content-length']) > 0) || Object.keys(req.body).length>0 || (Object.keys(req.query).length > 0)){
    return res.status(400).header('Cache-Control', 'no-cache, no-store, must-revalidate').json();
  }
  const connection = await testConnection()
  if(!connection){
    return res.status(503).header('Cache-Control', 'no-cache, no-store, must-revalidate').json()
  }
  return res.status(200).header('Cache-Control', 'no-cache, no-store, must-revalidate').json()
  
})
app.all('*',(req,res)=> {
  return res.status(404).header('Cache-Control', 'no-cache, no-store, must-revalidate').json();
})

const server = app.listen(3000, () => {
  logger.info(`Server listening on port 3000`)
});

module.exports = server;



