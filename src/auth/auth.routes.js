import { Router } from 'express';
import { check } from 'express-validator';


import { login } from '../auth/auth.controller.js';

import { validarCampos } from '../middlewares/validarCampos.js';


const router = Router();


router.post('/', [
  check('correo', 'The email is not valid').isEmail(),
  check('password', 'The password is obligatory').not().isEmpty(),
  validarCampos,
], login);


export default router;