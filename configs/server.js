"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import userRoutes from "../src/users/user.routes.js";
import authRoutes from "../src/auth/auth.routes.js";
import categoryRoutes from "../src/categories/category.routes.js";
import productRoutes from "../src/product/producto.routes.js";
import buscarRoutes from "../src/buscar/buscar.routes.js";
import cartRoutes from "../src/cart/cart.routes.js";
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/ProyectoFinal/v1/users";
    this.authPath = "/ProyectoFinal/v1/auth";
    this.categoryPath = '/ProyectoFinal/v1/category';
    this.productPath = '/ProyectoFinal/v1/product';
    this.buscarPath = '/ProyectoFinal/v1/buscar';
    this.cartPath = '/ProyectoFinal/v1/cart'
    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use(this.userPath, userRoutes);
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.categoryPath, categoryRoutes);
    this.app.use(this.productPath, productRoutes);
    this.app.use(this.buscarPath, buscarRoutes);
    this.app.use(this.cartPath, cartRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }
}

export default Server;
