import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchProducts = async () => (await api.get('/products')).data;

export const fetchProduct = async (id: string) =>
  (await api.get(`/products/${id}`)).data;

export const addProduct = async (formData: ProductInput): Promise<string> => {
  return await api.post('/products', formData);
};

export const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: ProductInput;
}): Promise<Product> => {
  return await api.put(`/products/${id}`, data);
};

export const deleteProduct = async (id: string) => {
  return await api.delete(`/products/${id}`);
};
