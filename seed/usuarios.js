import bcrypt from 'bcryptjs'

const usuarios = [
    {
        nombre: 'Hubert D',
        email: 'hubert@gmail.com',
        confirmado: 1,
        password: bcrypt.hashSync('password', 10) 
    },

    {
        nombre: 'Hubert',
        email: 'hubert1@gmail.com',
        confirmado: 1,
        password: bcrypt.hashSync('password', 10) 
    }

]

export default usuarios