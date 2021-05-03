const express = require('express');
const knex = require("knex");
const router = express.Router();

async function getComments(id){
    let comments = await knex('comments')
        .where({id: id})
    return comments;
};

router.get('/movie/:id', async function(req, res, next) {
    let resp = await knex('movies').where({id:req.params.id});
    if (resp.length === null){
        console.log('Movie does not exist.')
    }
    res.send(resp[0]);
});

router.get('/comments/:id', async function(req, res, next) {
    let resp = await knex('comments').where({movie:req.params.id});
    resp.sort((a,b)=>{
        return a.id - b.id
    })
    res.send(resp);
});

router.post('/comments', function(req, res, next){
    knex('comments')
        .insert(req.body)
        .returning('*')
        .then(()=>{
            res.send(`item ${req.body} added to moviewreviewdb`)
        })
        .catch(err => console.log(err));
});

router.put('/comments/:id', async function(req, res, next){
    let comments = await getComments(req.params.id)
    if (req.user.user === comments[0].users_id) {
        knex('comments')
            .where({ id: req.params.id })
            .update({comment: req.body.comment, rating: req.body.rating})
            .returning('*')
            .then((data)=>{
                res.send(data)
            })
            .catch(err => console.log(err));
    } else {
        res.status(401).send('Unauthorized User')
    }
});

router.delete('/:id', async function(req,res,next){
    let comments = await getComments(req.params.id)
    if (req.user.user === comments[0].users_id){
        knex('comments')
            .del()
            .where({id: req.params.id})
            .then((data)=>{
                res.send(data)
            })
            .catch(err => console.log(err))
    } else {
        res.status(401).send('Unauthorized User')
    }
});

module.exports = router;
