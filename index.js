const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {testConnection} = require('./config/dbconfig');
const userRoutes  = require('./routes/userRoutes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/v1',userRoutes);
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

app.listen(3000, () => {
  
});



