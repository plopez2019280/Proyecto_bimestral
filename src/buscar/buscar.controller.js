import { request, response } from 'express';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

import Categoria from '../categories/category.model.js';
import Producto from '../product/product.model.js';
export const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles',
];

const buscarProductos = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const producto = await Producto.findById(termino);
        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: productos
    })
}

export const buscarPorCategorias = async (termino = '', res = response) => {
    const query = { nombre: termino.toUpperCase() };
    const categoriaEncontrada = await Categoria.findOne(query);
  
    if (!categoriaEncontrada) {
      return res.status(404).json({
        msg: `Categoría con nombre '${termino}' no encontrada`
      });
    }
  
    const producto = await Producto.find({ categoria: categoriaEncontrada.id });
  
    return res.json({ producto });
  }

export const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `The collection: ${coleccion} does not exists
                  The collection has to be one of the following: ${coleccionesPermitidas}`
        });
    }


    switch (coleccion) {
        case 'usuarios':

            break;
        case 'categorias':
            buscarPorCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Oops, I forgot to do this search...'
            });
            break;
    }

}
