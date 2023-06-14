//import
//config: Loads .env file into process.env

require('dotenv').config();


//import express

const express= require('express')

//import cors

const cors= require('cors')


//create express server 
const server = express()

require('./db/connection')


//import routes
const router = require('./Routes/router')

//import middleware
const middleware= require('./Middleware/appMiddleware')

//create port number for server
const PORT = 3000 || process.env.PORT

//use corse,json parser 
server.use(cors())
server.use(express.json())

//use middleware
server.use(middleware.appMiddleware)

//use router in server app
server.use(router)



//to resolve http request
server.get('/',(req,res)=>
res.send('Bank Server Started!!')
)

server.post('/',(req,res)=>
res.send('Server'))

//run the server
server.listen(PORT,()=>{console.log(`Bank Server Started at PORT Number ${PORT}`);}
)

























