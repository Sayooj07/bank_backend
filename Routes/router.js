// import express
const express = require('express');

//import logmiddleware
const logMiddleware= require('../Middleware/routerSpecific')

//create routes, using express.Router() class,object
const router = new express.Router()

//define routes to resolve http request
const userController = require ('../controllers/userController')

//register request
router.post('/employee/register',userController.register)

//login request
router.post('/employee/login',userController.login)

//getBalance Request
router.get('/user/balance/:acno',logMiddleware.logMiddleware,userController.getBalance)

//user/transfer
router.post('/user/transfer',logMiddleware.logMiddleware,userController.transfer)

//ministatement
router.get('/user/transactions',logMiddleware.logMiddleware,userController.getTransactions)


//delete account

router.delete('/user/delete',logMiddleware.logMiddleware,userController.deleteMyAcno)

//export router
module.exports= router


