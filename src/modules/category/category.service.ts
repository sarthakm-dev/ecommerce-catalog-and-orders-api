import { CategoryRepository } from "./category.repository";
import { validateCreateCategory } from "./category.validation";

export class CategoryService {
  static async createCategory(data: any) {
    validateCreateCategory(data);
    return CategoryRepository.create(data.name);
  }

  static async getAllCategories() {
    return CategoryRepository.findAll();
  }

  static async getCategoryById(id: number) {
    const category = await CategoryRepository.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  static async deleteCategory(id: number) {
    const category = await CategoryRepository.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    await CategoryRepository.deleteById(id);
  }

  static async updateName(data: any, id: number) {
    const name = data.name;
    if (!name) {
      throw new Error("Category name is required");
    }
    const updated = await CategoryRepository.updateName(id, name);
    if (updated === 0) {
      throw new Error("Category not found");
    }
  }
}
