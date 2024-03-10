import { Router } from 'express';
import { buscar } from '../buscar/buscar.controller.js';

const router = Router();

router.get('/:coleccion/:termino' ,buscar);


export default router;