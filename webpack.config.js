import path from 'path'

export default {
    mode: 'development',
    entry: {
        mapa: './scr/js/mapa.js',
        agregarImagen: './scr/js/agregarImagen.js',
        mostrarMapa: './scr/js/mostrarMapa.js',
        mapaInicio: './scr/js/mapaInicio.js'

    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js') 
    }
}