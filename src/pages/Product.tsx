import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProduct, deleteProduct } from 'api/productsAPI';

const Product = () => {
  const { id } = useParams();
  const queryClient = useQueryClient(),
    navigate = useNavigate();

  const { data, status, error } = useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchProduct(id as string),
    staleTime: 60000,
    initialData: () => {
      return queryClient
        .getQueryData<Array<Product>>(['products'])
        ?.find((p) => p._id === id);
    },
  });

  const mutate = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.setQueryData(
        ['products'],
        (oldData: Array<{ _id: string }> | undefined) =>
          oldData!.filter((p) => p._id !== id)
      );
      navigate(-1);
    },
  });

  if (status === 'error') return <div>Error: {(error as Error).message}</div>;

  return (
    <section>
      <h1>{data.name}</h1>
      <ul>
        <li>Price: ${data.price.toFixed(2)}</li>
        <li>Category: {data.category}</li>
      </ul>
      <Link to='/products'>Back</Link>
      <Link to={`/products/${data._id}/edit`} state={{ product: data }}>
        Edit
      </Link>
      <button onClick={() => mutate.mutate(data._id)}>Delete</button>
    </section>
  );
};

export default Product;
