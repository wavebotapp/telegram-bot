const express = require('express')
const route = express.Router()
const userController = require('../Controllers/userController')
const SwapToken = require('../Controllers/uniswapTrader')
const { authuser } = require("../middlewares/authuser")


//================================= User Controllers ================================
route.post('/signup', userController.signUp)
route.post('/login', userController.login)
route.post('/verify', userController.verify)
route.post('/resendotp', userController.resendOTP)
route.post('/forgetPassword', userController.ForgetPassword)
route.post('/resetPassword', userController.resetPassword)
route.post('/watchlist', authuser, userController.watchList)
route.get('/getUserProfile', authuser, userController.getUserProfile);
route.post('/addWallet', authuser, userController.addWallet);
route.get('/recentUsers', authuser, userController.recentUsers);
route.get('/allWatchlistData', authuser, userController.allWatchList);
route.post('/removeCoinWatchlist', authuser, userController.removeCoinWatchlist);
route.post('/verifyPrivateKey', authuser , userController.verifyPrivateKey);
route.get('/fetchbalance', userController.fetchBalance);

route.post('/swapToken',SwapToken.swapToken);


module.exports = route