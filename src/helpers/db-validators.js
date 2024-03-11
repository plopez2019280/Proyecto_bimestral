import Role from '../users/roles.js';
import Usuario from '../users/user.model.js';
import Categoria from '../categories/category.model.js';
import Producto from '../product/product.model.js';
import Factura from '../bill/bill.model.js';

export const esRoleValido = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        throw new Error(`The rol ${rol} does not exists`);
    }

}


export const emailExiste = async (correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`The email: ${correo} already exists`);
    }

}


export const existeUsuarioPorId = async (id) => {

    const existeUser = await Usuario.findById(id);

    if (!existeUser) {
        throw new Error(`The id ${id} does not exists`);
    }

}

export const existeCategoriaPorId = async (id) => {

    const existeCategoria = await Categoria.findById(id);

    if (!existeCategoria) {
        throw new Error(`The id ${id} does not exists`);
    }

}

export const existeProductoPorId = async (id) => {

    const existeProducto = await Producto.findById(id);

    if (!existeProducto) {
        throw new Error(`The id ${id} does not exists`);
    }

}

export const existeFacturaPorId = async (id) => {

    const existeFactura = await Factura.findById(id);

    if (!existeFactura) {
        throw new Error(`The id ${id} does not exists`);
    }

}