import { Express } from "express";
import userRoutes from "./modules/user/user.routes";
import authRoutes from "./modules/auth/auth.routes";
import categoryRoutes from "./modules/category/category.routes";
import productRoutes from "./modules/product/product.routes";
export const registerRoutes = (app: Express) => {
  app.use("/users", userRoutes);
  app.use("/auth", authRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/products", productRoutes);
};
