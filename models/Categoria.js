import { DataTypes } from "sequelize"
import database from '../config/db.js'


const Categoria = database.define('categorias', {
    nombre: {
        type: DataTypes.STRING(30),
        allowNUll: false
    }


});

export default Categoria

