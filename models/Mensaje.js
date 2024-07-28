import { DataTypes } from "sequelize";
import database from "../config/db.js";

const Mensaje = database.define("mensajes", {
     mensaje: {
          type: DataTypes.STRING(200),
          allowNUll: false,
     },
});

export default Mensaje;
