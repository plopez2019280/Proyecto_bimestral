import jwt from 'jsonwebtoken';

export const generarJWT = ( uid = '' , nombre = '', cart = '') => {
    return new Promise( (resolve, reject) => {

        const payload = { uid, nombre, cart }
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject('The token could not be generated');
            } else {
                resolve( token );
            }
        } )
    } );
}

export default {
    generarJWT
}
