import { Request, Response, NextFunction } from "express";
import { CategoryService } from "./category.service";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = await CategoryService.createCategory(req.body);
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = await CategoryService.getCategoryById(
      Number(req.params.id),
    );
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await CategoryService.deleteCategory(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await CategoryService.updateName(req.body, Number(req.params.id));
    res.json({ message: "Category Updated" });
  } catch (err) {
    next(err);
  }
};
