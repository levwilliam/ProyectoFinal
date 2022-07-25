const router = require("express").Router();
const User = require("../models/User");  // Se genera un llamado del modelado para el usuario
const Post = require("../models/Post");  // Se genera un llamado del modelado para el post

//Creacion  POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
  //const savedPost = newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Actualizacion  POST para ello lo identificamos con la id del dato creado anteriormente
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("!Puedes Actulizar solo tu Aplicancio!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST  - Eliminar el post en base a la identificacion de su ID 
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("La publicación ha sido eliminada...");  // Con el mismo usuario creado
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("¡Puedes eliminar solo tu publicación!"); // Cuando se intente eliminar el post de un usuario ajeno
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST  Visualizar un dato en especifico
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS    Visualizar todos los datos 
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
