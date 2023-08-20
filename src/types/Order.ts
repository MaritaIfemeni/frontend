export interface Order {
    fullName: string;
    deliveryAddress: string;
    userId: string;
    orderDetails: OrderDetail[];
}

export interface OrderDetail {
    productId: string;
    quantity: number;
}
