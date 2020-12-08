const Comment = require('../Models/Comment')

exports.viewComments = async (req, res) => {
    const comments = await Comment.find({})
    res.send({ comments })
}

exports.addComment = async (req, res) => {
    const newComment = new Comment({
        name : req.body.name,
        comment : req.body.comment,
        replyTo : req.body.replyTo
    })
    try{
        await newComment.save()
        res.send({ comment : newComment })
    }catch(err){
        res.send({ error : err })
    }
}

exports.searchComment = async (req, res) => {
    const comments = await Comment.find({})

    const regEx = req.body.search
    const reg = new RegExp(regEx, "g");
    let searches = [];
    for (const comm of comments){
        if(comm.comment.match(reg) != null){
            searches.push(comm)
        }
    }
    res.send({searches})
}