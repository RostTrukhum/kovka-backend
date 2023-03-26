export interface IProductRequest {
  query: {
    skip: number;
    limit: number;
  };
}

export interface IProduct {
  product: {
    _id: string;
    title: string;
    price: number;
    img: string;
    type: string;
    subtype: string;
    createdAt: Date;
  };
  count: number;
  width: number;
  height: number;
  _id: string;
}
