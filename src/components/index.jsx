import { useProductData } from "./useProductData";
import BreadcrumbsNav from "./BreadcrumbsNav";
import { ProductImage } from "./ProductImage";
import { ProductFilters } from "./ProductFilters";
import { ProductList } from "./ProductList";
import { ProductDetails } from "./ProductDetails";
import { Container, Box, CircularProgress, Typography, Grid } from "@mui/material";

export const ProductSection = () => {
  const {
    loading,
    error,
    productData,
    selectedFilter,
    setSelectedFilter,
    filteredAdverts,
    groups,
    currentGroup,
    selectedImageUrl,
  } = useProductData();

  return (
    <Box sx={{ py: 4, backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <BreadcrumbsNav product={productData} />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center" sx={{ mt: 4 }}>
            Error: {error.message}
          </Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item size={{xs:12, md:4}}>
                <ProductImage selectedImageUrl={selectedImageUrl} productData={productData} />
              </Grid>
              <Grid item size={{xs:12, md:8}}>
                <ProductFilters
                  productData={productData}
                  groups={groups}
                  selectedFilter={selectedFilter}
                  setSelectedFilter={setSelectedFilter}
                  currentGroup={currentGroup}
                />
                <ProductList
                  adverts={filteredAdverts}
                  productData={productData}
                />
              </Grid>
              
            </Grid>
            <Grid item xs={12}>
            <ProductDetails
              productData={productData}
              selectedFilter={selectedFilter}
            />
          </Grid>
        </>
        )}
        
      </Container>
    </Box>
  );
};
