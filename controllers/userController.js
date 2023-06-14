// import model in userController.js file
const users = require('../models/userSchema')

// import jsonwebtoken
const jwt= require('jsonwebtoken')

// define and export logic to resolve different http client request

// register

exports.register = async (req,res)=>{

  // register logic
  console.log(req.body);

  // get data sed by front end
  const {username,acno,password} = req.body
  if(!username || !acno || !password){
    res.status(403).json("All Input are required!!!")
  }
  
  // check user is an exist user o
try{
   const preuser = await users.findOne ({acno})
   if(preuser){
    res.status(406).json("user already exist!!!")
   }
   else{
    // add user to db
    const newuser = new users({
      username,
      password,
      acno,
      balance:5000,
      transaction:[]
    })
    // to save newuser in mongodb
    await newuser.save()
    res.status(200).json(newuser)

   }
  
}catch(error){
  res.status(401).json(error)
 }
 } 

  // login 
  exports.login = async (req,res)=>{
    // get req body
    const {acno,password}= req.body
    try{
      // check acno n pswd is in db
      const preuser = await users.findOne({acno,password})
      // check preuser or not
      if(preuser){

            // generate token using jwt
            const token = jwt.sign({
              loginAcno:acno},"supersecretkey12345")
    
        res.status(200).json({preuser,token})
      }
      else{
        res.status(404).json("invalid ac number / password")
      }
    }
    catch(error){
      res.status(401).json(error)
    }
  }

  exports.getBalance = async (req,res)=>{

    let acno = req.params.acno

    console.log(acno);
    try{

      
    const preuser =  await users.findOne({acno})

      if (preuser) {

    
        res.status(200).json(preuser.balance)
        
      }

      else{

        res.status(404).json("Invalid Account Number")
      }
    }

    catch(error){

      res.status(401).json(error)
    }
  }

  //transfer 

  exports.transfer= async (req,res)=>{

    console.log("Inside transfer logic");
    //logic

     //1.get body from req,creditacno,amt,pswd

     

const{creditAcno,creditAmount,pswd} = req.body
let amt=Number(creditAmount)
const {debitAcno}= req
console.log(debitAcno);

//2.check debit acno and pswd is available in mongodb
try{ 
const debitUserDetails = await users.findOne({acno:debitAcno,password:pswd})
console.log(debitUserDetails);

const creditUserDetails= await users.findOne({acno:creditAcno})
console.log(creditUserDetails);



if(debitAcno!=creditAcno){ 

if (debitUserDetails && creditUserDetails) {

  if (debitUserDetails.balance>=creditAmount) {

    debitUserDetails.balance-=amt

    debitUserDetails.transactions.push({

      transaction_type:'DEBIT', amount:creditAmount, fromAcno:debitAcno, toAcno:creditAcno

    })

  await  debitUserDetails.save()

  creditUserDetails.balance+=amt

  creditUserDetails.transactions.push({

    transaction_type:'CREDIT', amount:creditAmount, fromAcno:debitAcno, toAcno:creditAcno

  })

await  creditUserDetails.save()


    res.status(200).json('Fund Transfer Successfull')
    
  }
  else{

res.status(406).json("Insufficient Balance")

  }
}
}
else{

  res.status(406).json("Invalid Credit Details")
}
}

catch(error){

  res.status(401).json(error)


}


  }
exports.getTransactions = async (req,res)=>{

  //get acno from req.debitAcno

  let acno= req.debitAcno
 
  //check whether acno present in mongodb

  try {


    const preuser = await users.findOne({acno})

    res.status(200).json(preuser.transactions)
    
  } catch (error) {
    res.status(404).json(error)
    
  }


}

//deleteMyAcno

exports.deleteMyAcno = async (req,res)=>{


  //get acno from req

  let acno= req.debitAcno

  //delete from mongodb

  try {


    await users.deleteOne({acno})
    res.status(200).json('Remove Successfully')




    
  } catch (error) {

    res.status(401).json(error)
    
  }


}



  

  