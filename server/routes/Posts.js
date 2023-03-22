const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddleware");
const router = express.Router();
const { Posts, Likes } = require("../models");

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

router.get("/liked", validateToken, async (req, res) => {
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  const listOfPosts = await Posts.findAll();
  res.json({ likedPosts: likedPosts, listOfPosts: listOfPosts });
})

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id)
  res.json(post);
})

router.get('/user/:userid', async (req, res) => {
  const posts = await Posts.findAll({
    where: { UserId: req.params.userid },
    include: [Likes]
  })
  res.json(posts);
})

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

router.put("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const { title, postText } = req.body;
  await Posts.update({
    title: title,
    postText: postText
  }, { where: { id: id } })
  res.json("Updated");
})

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId
    }
  })

  res.json("Deleted Successfully");
})
module.exports = router;
