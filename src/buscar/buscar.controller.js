import { request, response } from 'express';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

import Categoria from '../categories/category.model.js';

export const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'roles',
];



export const buscarPorCategorias = async( termino = '', res = response) => {
     const query = { nombre : termino.toUpperCase() };

    const categoriaEncontrada  = await Categoria.findOne(query);

    return res.json({
        producto
    })

}

export const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `La colección: ${ coleccion } no existe en la DB
                  Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }


    switch (coleccion) {
        case 'usuarios':

        break;
        case 'categorias':
            buscarPorCategorias(termino, res);
        break;
        default:
            res.status(500).json({
                msg: 'Ups, se me olvido hacer esta busqueda...'
            });
        break;
    }

}
