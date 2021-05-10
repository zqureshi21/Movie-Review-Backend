const express = require('express');
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
    let movies = await knex('movies');
    if (movies.length === null){
        res.send(404, 'movies')
    }
    let ratings = await getRatings()
    for (let i = 0; i < movies.length; i++){
        for (let j = 0; j < ratings.length; j++){
            if (movies[i].id === ratings[j].id){
                movies[i].ratings = ratings[j].ratings
                continue
            }
        }
    }
    movies.sort((a,b)=>{
        return a.id - b.id
    })
    res.send(movies);
});

router.get('/user', function(req, res, next){
    res.send(req.user);
})

module.exports = router;
