import { productsList } from '../data/productsList';
import { fetchProducts } from '../utils/api';
import { useState, useEffect } from 'react';
import BreadcrumbsNav from "../components/BreadcrumbsNav";
import Container from '@mui/material/Container';
import { ProductCard } from './ProductCard';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { useTheme, useMediaQuery } from "@mui/material";
import "../App.css";




export const ProductSection = () => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const getImageUrlBySize = (entries, targetSize) => {
    return (
      entries?.find((entry) => entry.size === targetSize)?.url ??
      entries?.[0]?.url
    );
  };

  useEffect(() => {
    setLoading(true);

    fetchProducts(productsList[0].id)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const entries = products?.data?.images?.[0]?.imagesUrls?.entry || [];

  let selectedImageUrl = "";
  if (isXs) selectedImageUrl = getImageUrlBySize(entries, "SMALL");
  else if (isSm) selectedImageUrl = getImageUrlBySize(entries, "MEDIUM");
  else if (isMdUp) selectedImageUrl = getImageUrlBySize(entries, "LARGE");

  return (
    <Box sx={{ py: 4, backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <BreadcrumbsNav product={products.data} />
  
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center" sx={{ mt: 4 }}>
            Error: {error.message}
          </Typography>
        ) : (
          <Grid container spacing={2}>
            <Grid item size={{xs:12, md:4}}>
                {selectedImageUrl && (
                    <Box
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-start" },
                        alignItems: "center",
                    }}
                    >
                    <CardMedia
                        component="img"
                        image={selectedImageUrl}
                        alt={products?.data?.cluster?.urlName}
                        sx={{
                        width: { xs: "80%", md: "100%" },
                        height: "auto",
                        borderRadius: 2,
                        objectFit: "cover",
                        }}
                    />
                    </Box>
                )}
            </Grid>


            <Grid item size={{xs:12, md:8}}>
                <Typography variant="subtitle1" fontWeight="bold">
                    {products?.data?.clusterProducts[0]?.title}
                </Typography>
    
              <Grid container spacing={2}>
                {products?.data?.clusterProducts?.map((product) => (
                  <Grid key={product.id} item size={12}>
                    <ProductCard
                      product={product}
                      grade={
                        products.data.globalRating?.score
                          ? `${products.data.globalRating.score}`
                          : 'No ratings'
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}  