const fetchProducts = async () => {
  return fetch(`${import.meta.env.VITE_API_URL}/products`).then((res) =>
    res.json()
  );
};

export default fetchProducts;
