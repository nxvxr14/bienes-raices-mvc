import { DataTypes } from "sequelize"
import database from '../config/db.js'


const Precio = database.define('precios', {
    nombre: {
        type: DataTypes.STRING(30),
        allowNUll: false
    }


});

export default Precio 


