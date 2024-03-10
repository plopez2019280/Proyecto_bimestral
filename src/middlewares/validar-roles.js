import { request, response } from 'express';

export const esAdminRole = (req = request, res = response, next) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: '>---You need to have a token first---<'
        });
    }

    const { rol, nombre } = req.usuario;

    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(500).json({
            msg: `${ nombre } is not administrator - It does not have permission`
        });
    }

    next();


}

export const tieneRole = ( ...roles ) => {

    return (req = request, res= response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: '>---You need to have a token first---<'
            })
        }

        if (!roles.includes( req.usuario.rol)) {
            return res.status(401).json({
                msg: `This action requires one of the followin roles: ${ roles }`
            })

        }

        next();

    }

}
