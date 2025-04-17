import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_PRODUCT_URL,
    timeout: 1000,
});

export const fetchProducts = async (productId) => {
    try {
        const response = await instance.get(`/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}
