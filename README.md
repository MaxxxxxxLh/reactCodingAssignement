## Project Structure

```
project-root/
├── node_modules/              
├── src/                       
│   ├── components/            
│   │   ├── BreadcrumbsNav.jsx
│   │   ├── Home.jsx
│   │   ├── index.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── ProductFilters.jsx
│   │   ├── ProductImage.jsx
│   │   ├── ProductList.jsx
│   │   └── useProductData.js  
│   ├── data/                  
│   │   └── productsList.js
│   ├── utils/                 
│   │   ├── api.js
│   │   └── utils.js
│   ├── App.css                
│   ├── App.jsx                
│   └── main.jsx               
├── .env                      
├── .env.example               
├── .gitignore                 
├── eslint.config.js           
├── index.html                 
├── package.json               
├── package-lock.json          
├── README.md                  
└── vite.config.js             
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/product-listing-app.git
   cd product-listing-app
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the development server:**
    ```bash
    npm run dev
    ```

4. **Open http://localhost:5173 to view it in the browser.**

## Environment Variables

Use the .env.example file to set up your environment variables. Create a .env file in the root of the project:
cp .env.example .env
Then, update the values as needed.