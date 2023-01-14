import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateProduct from 'api/updateProduct';
import Form from '../components/Form';

function ProductEdit() {
  const {
    state: { product },
  } = useLocation();
  const queryClient = useQueryClient(),
    navigate = useNavigate();

  const mutate = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', product._id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate.mutate({
      id: product._id,
      data: JSON.stringify(Object.fromEntries(formData)),
    });
    navigate(-1);
  };

  return (
    <section>
      <h1>Edit Product</h1>
      <Form submitHandler={handleSubmit} initialData={product} />
      <Link to={`/products/${product._id}`}>Back</Link>
    </section>
  );
}

export default ProductEdit;
