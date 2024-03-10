import { Router } from 'express';
import { check } from 'express-validator';
import { getUsuarios, postUsuario, putUsuario, deleteUsuario } from '../users/user.controller.js';
import { esRoleValido, emailExiste, existeUsuarioPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { tieneRole } from '../middlewares/validar-roles.js';

const router = Router();

router.get('/', getUsuarios);

router.post('/', [
  check('nombre', 'The name is obligatory').not().isEmpty(),
  check('password', 'The password must be 6 characters').isLength({ min: 6 }),
  check('correo', 'The email is not valid').isEmail(),
  check('correo').custom(emailExiste),
  validarCampos,
], postUsuario);

router.put('/:id', [
  check('id', 'The id is not valid').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRoleValido),
  validarCampos
], putUsuario);


router.delete('/:id', [
  validarJWT,
  tieneRole('ADMIN_ROLE'),
  check('id', 'The id is not valid').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], deleteUsuario);


export default router;
