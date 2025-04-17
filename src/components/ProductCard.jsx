import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

export const ProductCard = ({ product, data }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        p: 2,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Box sx={{ flex: 1 }}>
       <Typography variant="h6" color="primary" sx={{ my: 1 }}>
          {product.newBPrice} €
        </Typography>

        <Chip size="small" label={data.globalRating.score? `Note: ${data.globalRating.score}` : "Pas de "} sx={{ mb: 1 }} />

        <Divider sx={{ my: 1 }} />

      </Box>

    </Card>
  );
};
