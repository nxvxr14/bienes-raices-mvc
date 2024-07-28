import { Sequelize } from 'sequelize';
import { Precio, Categoria, Propiedad } from '../models/index.js'

const inicio = async (req, res) => {

    const [categorias, precios, casas, departamentos] = await Promise.all([
        Categoria.findAll({
            raw: true
        }),
        Precio.findAll({
            raw: true
        }),
        Propiedad.findAll({
            limit:3,
            where: {
                categoriaId: 1
            },
            include: [
                {
                    model: Precio,
                    as: 'precio'
                }
            ],
            order: [['createdAt', 'DESC']]
        }),
        Propiedad.findAll({
            limit:3,
            where: {
                categoriaId: 2
            },
            include: [
                {
                    model: Precio,
                    as: 'precio'
                }
            ],
            order: [['createdAt', 'DESC']]
        }),


    ]);

    res.render('inicio', {
        pagina: "Inicio",
        categorias,
        precios,
        casas,
        departamentos
        
    });
}

const categorias = async (req, res) => {
    const {id} = req.params;

    // Comprobar que la categoria exista
    const categoria = await Categoria.findByPk(id);

    if(!categoria){
        return res.redirect('/404');
    }

    const propiedades = await Propiedad.findAll({
        where: {
           categoriaId : id 
        },
        include:[
            {
                model: Precio,
                as: 'precio'
            }
        ]
    });

    res.render('categoria',{
        pagina: `${categoria.nombre}s en venta`,
        propiedades 
    })

}


const errorFour = (req, res) => {
    res.render('404',{
        pagina: 'Pagina no encontrada'
    });

}


const buscador = async (req, res) => {
    const {termino} = req.body;

    if(!termino.trim()){
        return res.redirect('back');

    }

    // Consultas las propiedades
    const propiedades = await Propiedad.findAll({
        where: {
            titulo: {
                [Sequelize.Op.like]: `%${termino}%`
        }

        },
        include: [ {
            model: Precio,
            as: "precio"
        }]

    });

    res.render("busqueda", {
        pagina: 'Resultado de la busqueda',
        propiedades
    });

}


export {
    inicio, 
    categorias,
    errorFour,
    buscador
}