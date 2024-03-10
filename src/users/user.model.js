import mongoose from 'mongoose';

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'The name is obligatory']
    },
    correo: {
        type: String,
        required: [true, 'The email is obligatory' ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is obligatory' ]
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'CLIENTE_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }, 
    cart: {
        type: Array,
        default: []
    }
});


export default mongoose.model('Usuario', UsuarioSchema);