import { productsList } from "../data/productsList";
import { Box, Container, Typography, Grid, Card, CardActionArea, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenue sur Rakuten
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Cliquez sur un produit pour voir les détails.
      </Typography>

      <Grid container spacing={3}>
        {productsList.map((product) => (
          <Grid key={product.id}>
            <Card>
              <CardActionArea component={Link} to={`/product/${product.id}`}>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {product.id}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
