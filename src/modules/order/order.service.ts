import { OrderRepository } from './order.repository';
import { OrderItemRepository } from './order-item.repository';
import { validateCreateOrder } from './order.validation';
import { ProductRepository } from '../product/product.repository';

export class OrderService {
  static async createOrder(userId: number, data: any) {
    validateCreateOrder(data);

    let totalAmount = 0;

    for (const item of data.items) {
      const product = await ProductRepository.findById(item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      const updated = await ProductRepository.reduceStock(product.id, item.quantity);
      if (updated === 0) {
        throw new Error(`Insuffient stock for ${product.name}`);
      }
      totalAmount += product.price * item.quantity;
    }

    const orderId = await OrderRepository.create(userId, totalAmount);

    for (const item of data.items) {
      if (!orderId) {
        throw new Error(`OrderId not Found`);
      }
      const product = await ProductRepository.findById(item.productId);
      await OrderItemRepository.create(orderId, item.productId, item.quantity, product.price);
    }

    return orderId;
  }

  static async getOrder(orderId: number) {
    const order = await OrderRepository.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    const items = await OrderItemRepository.findByOrderId(orderId);
    return { ...order, items };
  }
}
