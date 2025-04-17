import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

export const ProductImage = ({ selectedImageUrl, productData }) => {
  if (!selectedImageUrl) return null;

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        display: "flex",
        justifyContent: { xs: "center", md: "flex-start" },
        alignItems: "center",
      }}
    >
      <CardMedia
        component="img"
        image={selectedImageUrl}
        alt={productData?.cluster?.urlName}
        sx={{
          width: { xs: "70%", md: "100%" },
          height: "auto",
          borderRadius: 2,
          objectFit: "cover",
        }}
      />
    </Box>
  );
};
