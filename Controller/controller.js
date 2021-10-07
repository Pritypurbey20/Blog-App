const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile')[environment];
const knex = require('knex')(config)
const jwt = require('jsonwebtoken')

exports.signup = function(req,res){
    var Name = req.body.Name
    var Email = req.body.Email
    var Password = req.body.Password

    knex('Signup')
    .insert({Name:Name, Email:Email, Password:Password})
    .then(()=>{
        const token = jwt.sign(Email,'purbey')
        res.status(201).json({
            Message:'You are Signed up successfully',
            Token:token
        });
    })
    .catch((err)=>{
        res.json({
            message:err
        })
    })
}

exports.login = function(req,res){
    var Email = req.body.Email
    var Password = req.body.Password

    knex('Signup')
    .where({Email:Email , Password:Password})
    .then(()=>{
        const token = jwt.sign(Email,'purbey')
        res.status(201).json({
            Message:'You are logged in successfully',
            Token:token
        });
    })
    .catch((err)=>{
        res.json({
            message:'Invalid Email or Password..',
            Error:err
        })
    })
}

exports.post = function(req,res){
    var Email = req.body.Email
    var Post = req.body.Post
    var Like = req.body.Like
    var Dislike = req.body.Dislike

    knex('Signup')
    .where({Email:Email})
    .then(()=>{
        knex('Post')
        .insert({Email:Email,Post:Post,Like:Like,Dislike:Dislike})
        .then(()=>{
            res.status(201).json({
                Message:'Your post has been successfully created'
            });
        })
        .catch((err)=>{
            res.json({
                Error:err
            })
        })
    })
    .catch((err)=>{
        res.json({
            Message:'You do not have an account..',
            Error:err
        })
    })
}

exports.Seepost = function(req,res){
    knex('Post')
    .select('*')
    .then((posts)=>{
        res.json({
            Posts:posts
        })
    })
    .catch((err)=>{
        res.json({
            Error:err
        })
        
    })
}

exports.count = (req, res) => {
    detail = req.user
    console.log(detail.Email)
    knex("Post").select("*").where({ Post: req.body.Post })
        .then((result) => {
            Like = req.body.Like
            Dislike = req.body.Dislike
            if (result.length != 0) {
                if (Like == "like") {
                    user_like = result[0]["Like"] + 1
                    knex("Count").select("Email").where({ Email: detail.Email}, { Post: req.body.Post })
                        .then((result_sel) => {
                            if (result_sel.length != 0) {
                                if (result_sel[0]["Email"] != detail.Email) {
                                    knex("Post").where({ Post: req.body.Post }).update({
                                        like: user_like
                                    }).then((result_update) => {
                                        knex("Count").insert({
                                            Email: detail.Email,
                                            Post: req.body.Post,
                                            Like_or_Dislike: Like

                                        }).then((result_insert) => {
                                            if (result_insert != 0) {
                                                res.send("Post liked successfully")
                                            }
                                            else (
                                                res.send("Some error occured")
                                            )
                                        }).catch((err) => {
                                            res.send(err)
                                        })
                                    }).catch((err) => {
                                        res.send(err)
                                    })
                                } else {
                                    res.send("You have already like/dislike the post")
                                }
                            }else {
                                knex("Post").where({ Post: req.body.Post }).update({
                                    Like: user_like
                                }).then((result_update) => {
                                    knex("Count").insert({
                                        Email: detail.Email,
                                        Post: req.body.Post,
                                        Like_or_Dislike: Like
                                    }).then((result_insert) => {
                                        res.send("Post liked successfully")
                                    }).catch((err) => {
                                        res.send(err)
                                    })
                                }).catch((err) => {
                                    res.send(err)
                                })
                            }
                        }).catch((err) => {
                            res.send(err)
                        })
                }
                else if (Dislike == "dislike") {
                    user_dislike = result[0]["Dislike"] + 1
                    knex("Count").where({ Email: detail.Email }, { Post: req.body.Post }).select("Email")
                        .then((result_sel) => {
                            console.log(result_sel)
                            if (result_sel.length != 0) {
                                if (result_sel[0]["Email"] != detail.Email) {
                                    knex("Post").where({ Post: req.body.Post}).update({
                                        dislike: user_dislike
                                    }).then((result_update) => {
                                        knex("Count").insert({
                                            Email: detail.Email,
                                            Post: req.body.Post,
                                            Like_or_Dislike: dislike
                                        }).then((result_insert) => {
                                            res.send("Post disliked successfully")
                                        }).catch((err) => {
                                            res.send(err)
                                        })
                                    }).catch((err) => {
                                        res.send(err)
                                    })

                                } else {
                                    res.send("You have already like/dislike the post")
                                }
                            } else {
                                knex("Post").where({ Post: req.body.Post }).update({
                                    dislike: user_dislike
                                }).then((result_update) => {
                                    knex("Count").insert({
                                        Email: detail.Email,
                                        Post: req.body.Post,
                                        Like_or_Dislike: dislike
                                    }).then((result_insert) => {
                                        res.send("Post disliked successfully")
                                    }).catch((err) => {
                                        res.send(err)
                                    })
                                }).catch((err) => {
                                    res.send(err)
                                })
                            }

                        }).catch((err) => {
                            res.send(err)
                        })
                }
                else {
                    res.send("You cannot like/dislike")
                }
            } else {
                res.send("Invalid")
            }
        }).catch((err) => {
            res.send(err)
    })
}

exports.like_or_dislike = (req, res) => {
    knex("Post")
    .select("*")
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    })
}
