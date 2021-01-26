const express = require('express');

const router = express.Router();


const {requireSignin, authMiddleware, adminMiddleware} = require('../controllers/auth');
const {read} = require('../controllers/user');

const { use } = require('./blog');




router.get('/profile',requireSignin,authMiddleware,read);



module.exports=router;