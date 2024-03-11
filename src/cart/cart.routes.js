import { Router } from 'express';
import { check } from 'express-validator';

import { postCarrito, getCarrito, deleteCarrito, putCarrito } from '../cart/cart.controller.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';



const router = Router();


router.get('/', [
    validarJWT
] , getCarrito);


router.post('/:itemId', [
    validarJWT,
    check('itemId', 'The id is not valid').isMongoId()
], postCarrito );

router.put('/:itemId', [
    validarJWT,
    check('itemId', 'The id is not valid').isMongoId(),
    validarCampos
] , putCarrito);

router.delete('/:itemId', [
    validarJWT,
    check('itemId', 'The id is not valid').isMongoId(),
    validarCampos
] ,deleteCarrito);


export default router;