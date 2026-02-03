export const validateCreateOrder = (data: any) => {
  if (!Array.isArray(data.items) || data.items.length === 0) {
    throw new Error('Order must contain items');
  }

  for (const item of data.items) {
    if (typeof item.productId !== 'number' || typeof item.quantity !== 'number') {
      throw new Error('Invalid order item');
    }
  }
};
