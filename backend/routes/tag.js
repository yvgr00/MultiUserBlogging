const express = require('express');
const { requireSignin,adminMiddleware } = require('../controllers/auth');

const router = express.Router();
const {create, list, read, remove} = require('../controllers/tag');
const {runValidation} = require('../validators');
const {tagCreateValidator} = require('../validators/tag');


router.post('/tag',tagCreateValidator,runValidation,requireSignin,adminMiddleware,create);
router.get('/tags',list);
router.get('/tag/:slug',read);
router.delete('/tag/:slug',requireSignin,adminMiddleware,remove);

module.exports=router;