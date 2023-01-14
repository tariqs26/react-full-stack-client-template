import './Form.css';

type FormProps = {
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  initialData?: Product;
};

const Form: React.FC<FormProps> = ({ submitHandler, initialData }) => {
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='name'>Name</label>
      <input
        type='text'
        name='name'
        id='name'
        placeholder='eggs'
        defaultValue={initialData?.name || ''}
      />
      <label htmlFor='price'>Price</label>
      <input
        type='number'
        name='price'
        id='price'
        min='0'
        step='0.01'
        placeholder='1.00'
        defaultValue={initialData?.price || ''}
      />
      <label htmlFor='category'>Category</label>
      <select
        name='category'
        id='category'
        defaultValue={initialData?.category || ''}
      >
        <option value='vegetable'>Vegetables</option>
        <option value='fruit'>Fruits</option>
        <option value='dairy'>Dairy</option>
      </select>
      <input type='submit' value='Submit' />
    </form>
  );
};

export default Form;
