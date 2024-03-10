import { Router } from 'express';
import { check } from 'express-validator';

import { getCategorias, getCategoriaPorID, postCategoria, putCategoria, deleteCategoria } from '../categories/category.controller.js';
import { existeCategoriaPorId } from '../helpers/db-validators.js';

import { validarCampos } from '../middlewares/validarCampos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { esAdminRole } from '../middlewares/validar-roles.js';


const router = Router();

router.get('/', getCategorias );

router.get('/:id', [
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], getCategoriaPorID );

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'The name is obligatory').not().isEmpty(),
    validarCampos
] ,postCategoria);

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'The id is not valid').isMongoId(),
    check('nombre', 'The name is obligatory').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
] ,putCategoria);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'The id is no valid').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
] ,deleteCategoria);



export default router;