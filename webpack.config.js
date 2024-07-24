import path from 'path'

export default {
    mode: 'development',
    entry: {
        mapa: './scr/js/mapa.js',
        agregarImagen: './scr/js/agregarImagen.js'

    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js') 
    }
}