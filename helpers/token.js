import jwt from 'jsonwebtoken'

const generarJST = datos => jwt.sign({ id : datos.id, nombre : datos.nombre }, "secretPass", {expiresIn : '1d' }); 

const generarId = () =>  Math.random().toString(32).substring(2) + Date.now().toString(32);

export {
    generarId,
    generarJST
}