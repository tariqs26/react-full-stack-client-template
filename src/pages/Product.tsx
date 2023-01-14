import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import fetchProductById from 'api/fetchProductById';
import removeProduct from 'api/removeProduct';

export default function Product() {
  const { id } = useParams();
  const { data, status, error } = useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchProductById(id as string),
    staleTime: Infinity,
    initialData: () => {
      return queryClient
        .getQueryData<Array<{ _id: string }>>(['products'])
        ?.find((p: any) => p._id === id);
    },
  });

  const queryClient = useQueryClient(),
    navigate = useNavigate();
  const mutate = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
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
      <button
        onClick={() => {
          mutate.mutate(data._id);
          navigate(-1);
        }}
      >
        Delete
      </button>
    </section>
  );
}
