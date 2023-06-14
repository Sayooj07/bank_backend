//define logic for checking user loginned or not

//import jsonwebtoken
const jwt = require('jsonwebtoken')

const logMiddleware = (req,res,next)=>{

    console.log('Router Specific Middleware');

    //get token

    const token = req.headers['access-token']


    //verify token

try
  {  const {loginAcno}= jwt.verify(token,"supersecretkey12345")
    console.log(loginAcno);

    //pass loginAcno to req

    req.debitAcno= loginAcno

    //to process user request



    //to process user request
    next()}

    catch{

        res.status(401).json("Please Log In")
    }

}

module.exports={

    logMiddleware
}









