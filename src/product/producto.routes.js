import { Router } from 'express';
import { check } from 'express-validator';


import { validarCampos } from '../middlewares/validarCampos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { tieneRole, esAdminRole } from '../middlewares/validar-roles.js';


import { postProducto, putProducto, deleteProducto, getProductos, getProductoPorId } from '../product/product.controller.js';

import { existeProductoPorId } from '../helpers/db-validators.js';

const router = Router();

router.get('/', getProductos );

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'The name is obligatory').not().isEmpty(),
    validarCampos
], postProducto);

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'The id is not valid').isMongoId(),
    check('nombre', 'The name is obligatory').not().isEmpty(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], putProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], deleteProducto);



export default router;