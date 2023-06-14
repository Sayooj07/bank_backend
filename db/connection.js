
//import mongoose in connection.js file
const mongoose = require('mongoose')

//to get connection string from .env file :process.env
const connectionstring = process.env.DATABASE

//connect node app with mongodb using 

mongoose.connect(connectionstring,{
    useUnifiedTopology:true ,
    useNewUrlParser:true



}
).then(()=>{
    console.log('Mongodb Atlas Connected Succesfully!!');
}).catch(()=>{
    console.log('Mongodb Connection Error');
})


