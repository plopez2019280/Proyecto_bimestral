import { request, response } from 'express';
import Categoria from '../categories/category.model.js';


export const getCategorias = async (req = request, res = response) => {

    const query = { estado: true };

    const listaCategorias = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).populate('usuario', 'nombre')
    ]);

    res.json({
        msg: '>---CATEGORY LIST---<',
        listaCategorias
    });

}


export const getCategoriaPorID = async (req = request, res = response) => {

    const { id } = req.params;
    const categoriaById = await Categoria.findById(id).populate('usuario', 'nombre');

    res.status(201).json(categoriaById);
}


export const postCategoria = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `The category ${categoriaDB.nombre}, already exists`
        });
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json({
        msg: '>---CATEGORY CREATED---<',
        categoria
    });
}


export const putCategoria = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;

    const categoriaEditada = await Categoria.findByIdAndUpdate(id, resto, { new: true });

    res.status(201).json({
        msg: '>---CATEGORY UPDATED---<',
        categoriaEditada
    });

}

export const deleteCategoria = async (req = request, res = response) => {

    const { id } = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(201).json({
        msg: '>---CATEGORY ELIMINATED---<',
        categoriaBorrada
    });

}


