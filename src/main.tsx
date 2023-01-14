import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from 'pages/Products';
import Product from 'pages/Product';
import ProductForm from 'pages/ProductForm';
import ProductEdit from 'pages/ProductEdit';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Routes>
          <Route path='/products'>
            <Route index element={<Products />} />
            <Route path=':id' element={<Product />} />
            <Route path='new' element={<ProductForm />} />
            <Route path=':id/edit' element={<ProductEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
