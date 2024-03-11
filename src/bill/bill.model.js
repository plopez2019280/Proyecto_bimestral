import mongoose from 'mongoose';

const FacturaSchema = mongoose.Schema({
    NITEmisor: {
        type: String,
        required: [true , 'The the emitting NIT is mandatory'],
        unique: true
    },
    fecha: {
        type: Date,
        default: Date.now  
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    nombreUsuario: {
        type: String,
        required: [true , 'The name is obligatory'],
        unique: true
    },
    NITReceptor: {
        type: String,
        required: [true , 'Receiver nit is mandatory'],
        unique: true 
    },
    cart: {
        type: Array,
        default: []
    },
    total: {
        type: Number,
        required: [true , 'The total is obligatory'],
        unique: true 
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
});


export default mongoose.model('Factura', FacturaSchema);