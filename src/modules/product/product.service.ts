import { ProductRepository } from './product.repository';
import { validateCreateProduct } from './product.validation';
import { CategoryRepository } from '../category/category.repository';

export class ProductService {
  static async createProduct(data: any) {
    validateCreateProduct(data);

    const category = await CategoryRepository.findById(data.categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    return ProductRepository.create(data.name, data.price, data.stock, data.categoryId);
  }

  static async getAllProducts() {
    return ProductRepository.findAll();
  }

  static async getProductById(id: number) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  static async updateProduct(id: number, data: any) {
    const { name, price, stock } = data;

    if (!name || price === undefined || !stock) {
      throw new Error('Name and price are required');
    }

    const updated = await ProductRepository.update(id, name, price, stock);
    if (updated === 0) {
      throw new Error('Product not found');
    }
  }

  static async deleteProduct(id: number) {
    await ProductRepository.deleteById(id);
  }
}
