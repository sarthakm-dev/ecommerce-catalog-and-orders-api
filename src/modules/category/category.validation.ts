export const validateCreateCategory = (data: any) => {
  const { name } = data;

  if (!name || typeof name !== "string") {
    throw new Error("Category name is required");
  }
};
