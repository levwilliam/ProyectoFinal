/* El require de mongoogse
Significa que la primera vez que
 llamas require(‘mongoose’), está creando una instancia de la
  clase Mongoose y devolviéndola
*/
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


/* Cuado exportamos el model  necesitamos llamar al constructor del modelo en la instancia
de mongoose y pasarle el nombre de la coleccion y una referencia a la
definicion de la esquema
*/
module.exports = mongoose.model("Category", CategorySchema);
