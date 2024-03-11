import { request, response, } from 'express';
import Factura from '../bill/bill.model.js';

export const getFacturas = async (req = request, res = response) => {
    const query = { usuario: req.usuario.id };

    const listaFacturas = await Promise.all([
        Factura.countDocuments(query),
        Factura.find(query)
            .populate('usuario', 'cart')
    ]);

    return res.json({
        msg: '*---CUSTOMER INVOICE LIST---*',
        listaFacturas
    });

}


export const getFacturaPorId = async (req = request, res = response) => {

    const { id } = req.params;
    const facturaById = await Factura.findById(id)
    res.status(201).json(facturaById);

}


export const postFactura = async (req = request, res = response) => {
    const { estado, ...body } = req.body;
    const NITEmisor = '1234567-8';

    let totalQuantity = 0;
    let totalPrice = 0;


    const carrito = req.usuario.cart;

    for (let i = 0; i < carrito.length; i++) {
        totalQuantity += carrito[i].quantity;
        totalPrice += carrito[i].precio * carrito[i].quantity;
    }

    const data = {
        ...body,
        NITEmisor: NITEmisor,
        usuario: req.usuario.id,
        nombreUsuario: req.usuario.nombre,
        cart: req.usuario.cart,
        total: totalPrice
    }

    const producto = await Factura(data);

    await producto.save();

    res.status(201).json(producto);
}


export const putFactura = async (req = request, res = response) => {
    return res.json({
        msg: '>---BILL UPDATED---<',
        listaProductos
    });

    const { id } = req.params;
    const { estado, usuario, ...restoData } = req.body;

    if (restoData.nombre) {
        restoData.nombre = restoData.nombre.toUpperCase();
        restoData.usuario = req.usuario._id;
    }

    const productoActualizado = await Factura.findByIdAndUpdate(id, restoData, { new: true });

    res.status(201).json({
        msg: 'Put Controller Producto',
        productoActualizado
    })

}

export const deleteFactura = async (req = request, res = response) => {
    return res.json({
        msg: '>---BILL DELETED---<',
        listaProductos
    });

    const { id } = req.params;
    const productoEliminado_ = await Factura.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        msg: 'DELETE',
        productoEliminado_
    })

}
