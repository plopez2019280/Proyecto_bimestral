import { request, response } from "express";

import Usuario from "../users/user.model.js";
import Producto from "../product/product.model.js";
import usuario from "../users/user.model.js"

export const getCarrito = async (req = request, res = response) => {
  try {
    const idUsuario = req.usuario.id;
    const { cart } = await Usuario.findById(idUsuario).populate("cart.itemId");

    return res.status(200).json({ cart });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const postCarrito = async (req = request, res = response) => {
  const { itemId } = req.params;

  try {
    const item = await Producto.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "The product does not exists" });
    }

    const idUsuario = req.usuario.id;
    const { cart } = await Usuario.findById(idUsuario);

    const existeEnCarrito = cart.find((item) => item.itemId === itemId);

    if (existeEnCarrito) {
      existeEnCarrito.quantity += 1;
      existeEnCarrito.nombre = item.nombre;
      existeEnCarrito.precio = item.precio;
    } else {
      cart.push({ itemId, quantity: 1 });
    }

    await Usuario.findByIdAndUpdate(idUsuario, { cart });
    return res.status(200).json({ message: "*---Product added to cart---*" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "*---Internal server error---*" });
  }
};

export const putCarrito = async (req = request, res = response) => {
    const { itemId } = req.params;

    try {
      const item = await Producto.findById(itemId);
  
      if (!item) {
        return res.status(404).json({ message: "*---The product does not exists---*" });
      }
  
      const idUsuario = req.usuario.id;
      const { cart } = await Usuario.findById(idUsuario);
  
      const existeEnCarrito = cart.find((item) => item.itemId === itemId);
  
      if (existeEnCarrito) {
        if( existeEnCarrito.quantity <= 1) {
            deleteCarrito(req, res);
            return res.status(200).json({ message: "*---Product removed from cart---*" });
        }
        existeEnCarrito.quantity -= 1;
      }
  
      await Usuario.findByIdAndUpdate(idUsuario, { cart });
      return res.status(200).json({ message: "*---Product downgraded to 1 in cart---*" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "*---Internal server error---*" });
    }
};

export const deleteCarrito = async (req = request, res = response) => {
  const { itemId } = req.params;

  try {
    const idUsuario = req.usuario.id;
    const { cart } = await usuario.findById(idUsuario);

    const carritoActualizado = cart.filter((item) => item.itemId !== itemId);

    await Usuario.findByIdAndUpdate(idUsuario, { cart: carritoActualizado });
    return res.status(200).json({ message: "*---Item removed from cart---*" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "*---Internal server error---*" });
  }
};  


