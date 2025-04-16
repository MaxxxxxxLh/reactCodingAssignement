import { productsList } from '../data/productsList'
import { fetchProducts } from '../utils/api'
import { useState, useEffect } from 'react';
//import BreadcrumbsNav from "../components/BreadcrumbsNav";
import Container from '@mui/material/Container';
import { ProductCard } from './ProductCard';


export const ProductSection = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
  
  
    useEffect(() => {
      setLoading(true);
      Promise.all(productsList.map((product) => fetchProducts(product.id)))
        .then((datas) => {
          setProducts(datas)
          setLoading(false)
        })
        .catch((err) => {
          setError(err)
          setLoading(false)
        });
      }, []);
  
    return (
        <div className="product-section">
            <h2>Our Products</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <Container maxWidth="md">
                        {/*<BreadcrumbsNav name={product?.name} />*/}
                        {/*<ProductInfo product={product} />*/}
                        <ProductCard product={product.data}/>
                    </Container>
                ))}
            </div>
        </div>
    )
}
