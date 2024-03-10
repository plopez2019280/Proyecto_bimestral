import mongoose from 'mongoose';

const CategoriaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true , 'El nombre de la cateogira es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});


export default mongoose.model('Categoria', CategoriaSchema);