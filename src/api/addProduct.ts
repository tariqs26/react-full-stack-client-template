const addProduct = (formData: string) => {
  return fetch(`${import.meta.env.VITE_API_URL}/products`, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default addProduct;
