const express = require('express');
const knex = require("knex");
const router = express.Router();

async function getRatings(){
    let ratings = await knex('comments');
    let movies = [];
    let moviesArray = [];
    ratings.forEach(c =>{
        moviesArray.push(c.movies_id)
    })
    moviesArray = [...new Set(moviesArray)]
    moviesArray.forEach(c => movies.push({id: c, ratings: []}))
    for (let i = 0; i < movies.length; i++){
        for (let j = 0; j < ratings.length; j++){
            if (movies[i].id === ratings[j].movies_id){
                movies[i].ratings.push(ratings[j].rating)
            }
        }
    }
    return movies;
}

router.get('/', async function(req, res, next) {
    let resp = await knex('movies');
    if (resp.length === null){
        res.send(404, 'movies')
    }
    let ratings = await getRatings()
    for (let i = 0; i < resp.length; i++){
        for (let j = 0; j < ratings.length; j++){
            if (resp[i].id === ratings[j].id){
                resp[i].ratings = ratings[j].ratings
                continue
            }
        }
    }
    resp.sort((a,b)=>{
        return a.id - b.id
    })
    res.send(resp);
});

router.get('/user', function(req, res, next){
    res.send(req.user)
})

module.exports = router;
