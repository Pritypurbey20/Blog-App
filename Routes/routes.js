const express = require('express')
const router = express.Router()
const controller = require('../Controller/controller')
const auth = require('../auth')

router.post('/signup',controller.signup)
router.post('/login',controller.login)
router.post('/post',auth,controller.post)
router.get('/seepost',auth,controller.Seepost)
router.post('/react',auth,controller.count)
router.get('/seereact',auth,controller.like_or_dislike)

module.exports = router


