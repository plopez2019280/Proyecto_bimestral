import { request, response, } from 'express';
import Producto from '../product/product.model.js';

export const getProductos = async (req = request, res = response) => {

    const query = { estado: true };

    const listaProductos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'correo')
            .populate('categoria', 'nombre')
    ]);

    res.json({
        msg: '>---PRODUCT LIST---<',
        listaProductos
    });

}


export const getProductoPorId = async (req = request, res = response) => {

    const { id } = req.params;
    const prouductoById = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.status(201).json(prouductoById);

}


export const postProducto = async (req = request, res = response) => {

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });
    if (productoDB) {
        return res.status(400).json({
            msg: `The product ${productoDB.nombre}, already exists`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario.id
    }

    const producto = await Producto(data);

    await producto.save();

    res.status(201).json({
        msg: '>---PRODUCT CREATED---<',
        producto
    });

}


export const putProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...restoData } = req.body;

    if (restoData.nombre) {
        restoData.nombre = restoData.nombre.toUpperCase();
        restoData.usuario = req.usuario._id;
    }

    const productoActualizado = await Producto.findByIdAndUpdate(id, restoData, { new: true });

    res.status(201).json({
        msg: '>---PRODUCT UPDATED---<',
        productoActualizado
    })

}

export const deleteProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const productoEliminado_ = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        msg: '>---PRODUCT DELETED---<',
        productoEliminado_
    })

}

