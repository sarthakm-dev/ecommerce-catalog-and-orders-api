import { Request, Response, NextFunction } from 'express';
import { ProductService } from './product.service';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = await ProductService.createProduct(req.body);
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await ProductService.getAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductService.getProductById(Number(req.params.id));
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ProductService.updateProduct(Number(req.params.id), req.body);
    res.status(200).json({ message: 'Product updated' });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ProductService.deleteProduct(Number(req.params.id));
    res.status(204).json({ message: 'Product Deleted Successfully' });
  } catch (err) {
    next(err);
  }
};
