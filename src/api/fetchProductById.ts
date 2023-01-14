const fetchProductById = async (id: string) => {
  return fetch(`${import.meta.env.VITE_API_URL}/products/${id}`).then((res) =>
    res.json()
  );
};

export default fetchProductById;
