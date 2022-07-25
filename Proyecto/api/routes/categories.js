const router = require("express").Router();
const Category = require("../models/Category"); // Se genera un llamado del modelado


// Utilizamos el metodo POST para enviar datos al servidor para crear/ actulizar  el recurso
// Esto permite almancear al cuerpo de la  solicitud
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Con el metodo get solicito el dato del recurso especifico esto nos ayudara en parte en cuenta que la cadena de consulta
// se envie en la url de la socilitud ---- ejemplo http://localhost:5000/api/users/62dadbe5951978bb4c302b01

router.get("/", async (req, res) => {
    try {
      const cats = await Category.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
