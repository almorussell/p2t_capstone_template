import React, { useState, useEffect } from 'react'
import { getProducts, createProduct } from '../services/ProductService'
import Products from '../components/Products';
import { useUserStore } from '../store/UserStore';
import UploadForm from '../components/UploadForm';

const Admin = () => {
  const { username, role } = useUserStore();
  const [products, setProducts] = useState([]);
  const [newUpload, setNewUpload] = useState(false);
  
  // const [id, setId] = useState(4);
  // const [productName, setProductName] = useState("PLACEHOLDER");
  // const [price, setPrice] = useState(1)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [newUpload]);
    

  return (
    <main className='main-content'>
      
      <Products products={products} />
      
      
    </main>
  )
}
export default Admin
