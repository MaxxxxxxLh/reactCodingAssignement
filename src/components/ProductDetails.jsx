import { Box, Typography } from "@mui/material";
import replaceSizeInDescription from "../utils/utils";

export const ProductDetails = ({ productData, selectedFilter }) => {
  if (!productData?.productDetailTitle && !productData?.description && !productData?.edito) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      {productData.productDetailTitle && (
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {productData.productDetailTitle}
        </Typography>
      )}

      {productData.description && (
        <Box
          sx={{ mt: 2 }}
          dangerouslySetInnerHTML={{
            __html: `<ul>${replaceSizeInDescription(
              productData.description,
              selectedFilter
            )}</ul>`,
          }}
        />
      )}

      {productData.edito && (
        <Box
          sx={{ mt: 2 }}
          dangerouslySetInnerHTML={{ __html: productData.edito }}
        />
      )}
    </Box>
  );
};
