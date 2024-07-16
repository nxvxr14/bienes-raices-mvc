import nodemailer from 'nodemailer'

const emailRegistro = async(datos) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
});

    const { nombre, email, token } = datos;

    // Enviar email
    await transport.sendMail({
        from: 'Bienesraices.com',
        to : email,
        subject : `Hola ${nombre}, confirma tu cuenta en Bienesraices`,
        text : `Hola ${nombre}, confirma tu cuenta en Bienesraices`,
        html : `
            <a href="http://172.16.128.130:3000/auth/comprobar/${token}" > Click acá para confirmar tu cuenta. </a>
        
        `
    });

}

const emailRecuperacion = async(datos) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
});

    const { nombre, email, token } = datos;

    // Enviar email
    await transport.sendMail({
        from: 'Bienesraices.com',
        to : email,
        subject : `Hola ${nombre}, restablece tu contraseña en en Bienesraices`,
        text : `Hola ${nombre}, restablece tu contraseña en en Bienesraices`,
        html : `
            <a href="http://172.16.128.130:3000/auth/recuperar/${token}" > Click acá para recuperar tu cuenta. </a>
        
        `
    });

}


export {
    emailRegistro,
    emailRecuperacion
}