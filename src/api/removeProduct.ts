const removeProduct = async (id: string) => {
  return fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
    method: 'DELETE',
  });
};

export default removeProduct;
