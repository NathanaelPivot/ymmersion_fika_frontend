import { Product } from "./product.model";

export interface Order {
    totalPrice: number,
    orderItems: Product[],
}
