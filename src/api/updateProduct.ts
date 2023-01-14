const updateProduct = ({ id, data }: { id: string; data: string }) => {
  return fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
    method: 'PUT',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default updateProduct;
