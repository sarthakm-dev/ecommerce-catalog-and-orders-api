export interface OrderItemInput {
  productId: number;
  quantity: number;
}

export interface CreateOrderInput {
  items: OrderItemInput[];
}
