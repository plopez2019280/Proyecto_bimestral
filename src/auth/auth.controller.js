import { request, response } from 'express';
import bcrypt from 'bcryptjs';

import { generarJWT } from '../helpers/generate-jwt.js';
import Usuario from '../users/user.model.js';

export const login = async (req = request, res = response) => {

  const { correo, password } = req.body;

  try {


    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: 'User / Password are incorrect - (The email doesn`t exists)'
      });
    }

    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'User / Password are incorrect - status: false'
      });
    }

    const validarPassword = bcrypt.compareSync(password, usuario.password);
    if (!validarPassword) {
      return res.status(400).json({
        msg: 'User / Password are incorrect - (password incorrect)'
      });
    }


    const token = await generarJWT(usuario.id, usuario.nombre, usuario.cart);

    res.json({
      msg: '>---LOGGED IN---<',
      correo, password,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Talk to the administrator'
    });
  }



}


export default {
  login
}