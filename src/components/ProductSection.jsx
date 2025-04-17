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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import replaceSizeInDescription from "../utils/utils.js";
import "../App.css";

export const ProductSection = () => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const getImageUrlBySize = (entries, targetSize) => {
    return (
      entries?.find((entry) => entry.size === targetSize)?.url ?? entries?.[0]?.url
    );
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts(productsList[0].id)
      .then((data) => {
        setProducts(data);
  
        const firstSize = data?.data?.declinationGroupsFromMFP?.groups?.[0]?.groupKeyValue;
        if (firstSize) {
          setSelectedSize(firstSize);
        }
  
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
  
  const entries = products?.data?.images?.[0]?.imagesUrls?.entry || [];

  const groups = products?.data?.declinationGroupsFromMFP?.groups || [];
    
  const uniqueSizes = groups.map((group) => group.groupKeyValue);

  const sizeFilteredGroups = selectedSize
    ? groups.filter((group) => group.groupKeyValue === selectedSize)
    : groups;

  let selectedImageUrl = "";
  if (isXs) selectedImageUrl = getImageUrlBySize(entries, "SMALL");
  else if (isSm) selectedImageUrl = getImageUrlBySize(entries, "MEDIUM");
  else if (isMdUp) selectedImageUrl = getImageUrlBySize(entries, "LARGE");
  console.log("size")
  console.log(sizeFilteredGroups);
  
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
            <Grid item size={{ xs: 12, md: 4 }}>
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

            <Grid item size={{ xs: 12, md: 8 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                {sizeFilteredGroups[0]?.groupProducts[0]?.title}
              </Typography>

              {uniqueSizes.length > 0 && (
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="filter-label">Filtrer par taille</InputLabel>
                  <Select
                    labelId="filter-label"
                    value={selectedSize}
                    label="Filtrer par taille"
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {uniqueSizes.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <Grid container spacing={2}>
                {sizeFilteredGroups.map((group) =>
                  group.groupProducts.map((product) => (
                    <Grid key={product.id} item xs={12}>
                      <ProductCard
                        product={product}
                        data={
                          products.data
                        }
                      />
                    </Grid>
                  ))
                )}
              </Grid>
            </Grid>
            {products?.data?.productDetailTitle && (
            <Grid item xs={12}>
                <Box sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {products.data.productDetailTitle}
                </Typography>

                {products.data.description && (
                    <Box
                    sx={{ mt: 2 }}
                    dangerouslySetInnerHTML={{
                        __html: `<ul>${replaceSizeInDescription(
                        products.data.description,
                        selectedSize
                        )}</ul>`,
                    }}
                    />
                )}

                {products.data.edito && (
                    <Box
                    sx={{ mt: 2 }}
                    dangerouslySetInnerHTML={{ __html: products.data.edito }}
                    />
                )}
                </Box>
            </Grid>
            )}

          </Grid>
        )}
      </Container>
    </Box>
  );
};
