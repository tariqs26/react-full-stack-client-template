import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from 'api/productsAPI';
import { productFromData } from '../utils';
import Form from 'components/Form';

const ProductEdit = () => {
  const {
    state: { product },
  } = useLocation();
  const queryClient = useQueryClient(),
    navigate = useNavigate();

  const mutate = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data: Product) => {
      queryClient.setQueryData(
        ['products'],
        (oldData: Array<Product> | undefined) =>
          oldData!.map((p) => (p._id === data._id ? data : p))
      );
      navigate(-1);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate.mutate({ id: product._id, data: productFromData(e.currentTarget) });
  };

  return (
    <section>
      <h1>Edit Product</h1>
      <Form submitHandler={handleSubmit} initialData={product} />
      <Link to={`/products/${product._id}`}>Back</Link>
    </section>
  );
};

export default ProductEdit;
