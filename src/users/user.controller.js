import { response, request } from 'express';
import bcrypt from 'bcryptjs';
import Usuario from '../users/user.model.js';

export const getUsuarios = async (req = request, res = response) => {

  const query = { estado: true };

  const listaUsuarios = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
  ]);

  res.json({
    msg: '>---USER LIST---<',
    listaUsuarios
  });

}

export const postUsuario = async (req = request, res = response) => {

  const { nombre, correo, password, rol } = req.body;
  const usuarioGuardadoDB = new Usuario({ nombre, correo, password, rol });

  const salt = bcrypt.genSaltSync();
  usuarioGuardadoDB.password = bcrypt.hashSync(password, salt);

  await usuarioGuardadoDB.save();

  res.json({
    msg: '>---USER CREATED!---<',
    usuarioGuardadoDB
  });

}


export const putUsuario = async (req = request, res = response) => {

  const { id } = req.params;
  const { _id, img, estado, google, ...resto } = req.body;


  if (resto.password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(resto.password, salt);
  }


  const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: '>---USER UPDATED!---<',
    usuarioEditado
  });

}

export const deleteUsuario = async (req = request, res = response) => {

  const { id } = req.params;
  const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
    msg: '>---USER ELIMINATED!---<',
    usuarioEliminado
  });
}
