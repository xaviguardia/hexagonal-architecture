export interface OrderReadModel {
  id: string;
  customerId: string;
  status: string;
  total: string;
  itemCount: number;
  createdAt: string;
}

export interface GetOrderQuery {
  execute(orderId: string): Promise<OrderReadModel>;
}

export interface ListOrdersQuery {
  execute(): Promise<OrderReadModel[]>;
}
