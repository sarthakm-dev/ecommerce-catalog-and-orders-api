export const validateCreateProduct = (data: any) => {
  const { name, price, categoryId } = data;

  if (!name || typeof name !== 'string') {
    throw new Error('Product name is required');
  }

  if (price === undefined || typeof price !== 'number') {
    throw new Error('Product price is required');
  }

  if (!categoryId || typeof categoryId !== 'number') {
    throw new Error('CategoryId is required');
  }
};
