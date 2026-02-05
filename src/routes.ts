import { Express } from 'express';
import userRoutes from './modules/user/user.routes';
import authRoutes from './modules/auth/auth.routes';
import categoryRoutes from './modules/category/category.routes';
import productRoutes from './modules/product/product.routes';
import orderRoutes from './modules/order/order.routes';
import permissionRoutes from './modules/permission/permission.routes';
export const registerRoutes = (app: Express) => {
  app.use('/api/users', userRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/permissions', permissionRoutes);
};
