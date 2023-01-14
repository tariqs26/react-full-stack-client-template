import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import fetchProducts from 'api/fetchProducts';

const Products = () => {
  const { data, status, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: Infinity,
  });
  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error: {(error as Error).message}</div>;

  return (
    <section>
      <h1>Products</h1>
      <ul>
        {data.map((product: Product) => {
          return (
            <li key={product._id}>
              <Link to={`/products/${product._id}`}>{product.name}</Link>
            </li>
          );
        })}
      </ul>
      <Link to='/products/new'>Add a new product</Link>
    </section>
  );
};

export default Products;
