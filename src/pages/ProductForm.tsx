import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct } from 'api/productsAPI';
import { productFromData } from '../utils';
import Form from 'components/Form';

const ProductForm = () => {
  const queryClient = useQueryClient(),
    navigate = useNavigate();

  const mutate = useMutation({
    mutationFn: addProduct,
    onSuccess: (data: string) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate(`/products/${data}`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate.mutate(productFromData(e.currentTarget));
  };

  return (
    <section>
      <h1>Create Product</h1>
      <Form submitHandler={handleSubmit} />
      <Link to='/products'>Back</Link>
    </section>
  );
};

export default ProductForm;
