import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import addProduct from 'api/addProduct';
import Form from 'components/Form';

function ProductForm() {
  const queryClient = useQueryClient(),
    navigate = useNavigate();

  const mutate = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate.mutate(JSON.stringify(Object.fromEntries(formData)));
    navigate('/products');
  };

  return (
    <section>
      <h1>Create Product</h1>
      <Form submitHandler={handleSubmit} />
      <Link to='/products'>Back</Link>
    </section>
  );
}

export default ProductForm;
