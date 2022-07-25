const router = require("express").Router();
const User = require("../models/User");  // Se genera un llamado del modelado
const bcrypt = require("bcrypt");

//Registro de Nuevo Usuario
router.post("/register", async (req, res) => {
  try {
    //brcrypt
    /* Lo que se hace es la contraseña pasa por un algoritmo hash , devolviendo la misma contraseña
    pero en cifrado blowfish  */
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

  //Registrar antes postman
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      //password: req.body.password,    -----> aca  enviamos la informacion de forma normal
      password: hashedPass, 
      // en envia cifrada
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Logueo de nuevo usuario
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
 //   !user && res.status(400).json("Wrong credentials!");
    !user && res.status(400).json("¡Credenciales de Usuario Incorrecta!");


    const validated = await bcrypt.compare(req.body.password, user.password);
//    !validated && res.status(400).json("Wrong credentials!");
    !validated && res.status(400).json("¡Credenciales de Constraseña Incorrecta!");


    //const { password, ...others } = user;
    const { password, ...others } = user._doc;

    
    res.status(200).json(others);
    //res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
