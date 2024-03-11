import { Router } from 'express';
import { check } from 'express-validator';

import { getFacturas, getFacturaPorId, postFactura, putFactura, deleteFactura} from '../bill/bill.controller.js';
import { existeFacturaPorId } from '../helpers/db-validators.js';

import { validarCampos } from '../middlewares/validarCampos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';


const router = Router();

router.get('/',[
    validarJWT,
    validarCampos
], getFacturas );

router.get('/:id', [
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom( existeFacturaPorId ),
    validarCampos
], getFacturaPorId );

router.post('/', [
    validarJWT,
    check('NITReceptor', 'The receiver nit is mandatory').not().isEmpty(),
    validarCampos
] ,postFactura);

router.put('/:id', [
    validarJWT,
    check('id', 'The id is not valid').isMongoId(),
    check('nombre', 'The name is obligatory').not().isEmpty(),
    check('id').custom( existeFacturaPorId ),
    validarCampos
] ,putFactura);

router.delete('/:id', [
    validarJWT,
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom( existeFacturaPorId ),
    validarCampos
] ,deleteFactura);



export default router;