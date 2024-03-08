import mongoose from "mongoose";
import { roles } from "./roles.js"; // Importa la constante roles

const UserSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "The name is required"],
  },
  correo: {
    type: String,
    required: [true, "Email is mandatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: [roles.ADMIN_ROLE, roles.CLIENT_ROLE],
    default: roles.CLIENT_ROLE,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

export default mongoose.model("User", UserSchema);
