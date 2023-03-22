const express = require('express');
const router = express.Router();
const { Users, Details } = require('../models')
const bcrypt = require('bcrypt');
const { validateToken } = require('../middlewares/AuthMiddleware');
const { sign } = require('jsonwebtoken')

router.post("/", async (req, res) => {
    const { username, password, emailId } = req.body;
    const user = await Users.findOne({ where: { username: username }})

    if (user) res.json({ error: "Username already exists" });

    else {
        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                username: username,
                password: hash,
                emailId: emailId
            })
            res.json("Success");
        })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username } })

    if (!user) res.json({ error: "User doesn't Exist" });
    else {
        bcrypt.compare(password, user.password).then(async (match) => {
            if (!match) res.json({ error: "Wrong credentials" });
            else {
                const accessToken = sign({ username: user.username, id: user.id }, "Imp");
                res.json({
                    token: accessToken,
                    username: username,
                    id: user.id
                });
            }
        })
    }
})

router.get('/user', validateToken, (req, res) => {
    res.json(req.user);
})

router.post('/details', async (req, res) => {
    const { description, location, Link } = req.body;
    const Add = await Details.create({
        description: description,
        location: location,
        Link: Link
    })
    res.json(Add);
})

router.get('/userinfo/:id', async (req, res) => {
    const id = req.params.id;
    const basicInfo = await Users.findByPk(id, {
        attributes: { exclude: ["password"] }
    });
    const details = await Details.findByPk(id);
    res.json({ basicInfo: basicInfo, details: details });
})

router.put('/changepwd', validateToken, async (req, res) => {
    const { Old, New } = req.body;
    const user = await Users.findOne({ where: { username: req.user.username } });

    bcrypt.compare(Old, user.password).then(async (match) => {
        if (!match) res.json({ error: "Wrong credentials" });
        else {
            bcrypt.hash(New, 10).then(async (hash) => {
                await Users.update({
                    password: hash
                }, 
                { where: { username: req.user.username } })
                res.json("Success");
            })
        }
    })
})

module.exports = router