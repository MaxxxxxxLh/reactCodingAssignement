import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export const ProductImage = ({ selectedImageUrl, productData }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!selectedImageUrl) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <CircularProgress />
      </Box>
    );
  }
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
      {!isLoaded && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      <CardMedia
        component="img"
        image={selectedImageUrl}
        alt={productData?.cluster?.urlName}
        onLoad={() => setIsLoaded(true)}
        sx={{
          width: { xs: "70%", md: "100%" },
          height: "auto",
          borderRadius: 2,
          objectFit: "cover",
        }}
        loading="lazy"
      />
    </Box>
  );
};
