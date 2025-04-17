import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export const ProductImage = ({ selectedImageUrl, productData }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const isMultipleImages = Array.isArray(selectedImageUrl);

  if (!selectedImageUrl || (isMultipleImages && selectedImageUrl.length === 0)) {
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
        flexDirection: isMultipleImages ? "column" : "row", 
      }}
    >
      {(!isLoaded && !isMultipleImages) && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {isMultipleImages ? (
        selectedImageUrl.map((image, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <CardMedia
              component="img"
              image={image}
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
        ))
      ) : (
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
      )}
    </Box>
  );
};
