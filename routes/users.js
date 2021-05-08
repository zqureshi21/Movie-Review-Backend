const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const fs = require('fs')
const accessToken = 'accessToken';

let usersData = knex('users').then((usersData)=>{
    return usersData;
})

router.post('/login', async function(req, res, next) {
    const username = req.body.username
    const password = req.body.password
    let users = await usersData
    const user = users.find(u => { return u.username === username && u.password === password });
    if(user) {
        const authToken = jwt.sign({ user: user.username, id: user.id }, accessToken);
        res.json({
            authToken
        });
    } else {
        res.status(403)
        res.send('Username or Password is Incorrect');
    }
});

module.exports = router;
