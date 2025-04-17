import { Grid, Box, Typography } from "@mui/material";
import { ProductCard } from "./ProductCard";

export const ProductList = ({ adverts, productData }) => {
  if (adverts.length === 0) {
    return (
      <Grid item xs={12}>
        <Box
          sx={{
            mt: 4,
            p: 4,
            textAlign: "center",
            border: "2px dashed #ccc",
            borderRadius: 2,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="text.secondary">
            Oups, aucun produit trouvé pour cette sélection.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Essayez un autre filtre ou revenez plus tard.
          </Typography>
        </Box>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {adverts.map((advert) => (
        <Grid key={advert.advertId} item xs={12}>
          <ProductCard product={advert} data={productData} />
        </Grid>
      ))}
    </Grid>
  );
};
