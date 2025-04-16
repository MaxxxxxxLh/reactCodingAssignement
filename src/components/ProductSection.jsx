import { productsList } from '../data/productsList'
import { fetchProducts } from '../utils/api'
import { useState, useEffect } from 'react';
import BreadcrumbsNav from "../components/BreadcrumbsNav";
import Container from '@mui/material/Container';
import { ProductCard } from './ProductCard';
import "../App.css"

export const ProductSection = () => {
    //const [products, setProducts] = useState([])
    const [products, setProducts] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
  
  
    useEffect(() => {
      setLoading(true);
      /*Promise.all(productsList.map((product) => fetchProducts(product.id)))
        .then((datas) => {
          setProducts(datas)
          setLoading(false)
        })
        .catch((err) => {
          setError(err)
          setLoading(false)
        });
      }, []);*/
      //Only fetch the first product for now
      setLoading(true);

      fetchProducts(productsList[2].id)
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
      }, []);
    console.log(products.data)
      return (
        <div className="product-section">
          {<BreadcrumbsNav product={products.data} />}
      
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
      
          {!loading && products?.data?.clusterProducts && (
            <div className="product-grid">
              {products.data.clusterProducts.map((product) => (
                <Container key={product.id} maxWidth="md">
                  <ProductCard 
                    product={product} 
                    grade={
                      products.data.globalRating?.score 
                        ? `${products.data.globalRating.score}` 
                        : 'No ratings'
                    } 
                  />
                </Container>
              ))}
            </div>
          )}
        </div>
      )
      
}
