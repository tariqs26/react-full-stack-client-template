type Product = {
  _id: string;
  name: string;
  price: number;
  category: 'vegetables' | 'fruits' | 'dairy';
};

type ProductInput = Omit<Product, '_id'>;