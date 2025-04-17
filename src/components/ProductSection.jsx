import { useState, useEffect } from "react";
import { productsList } from "../data/productsList";
import { fetchProducts } from "../utils/api";
import BreadcrumbsNav from "../components/BreadcrumbsNav";
import { ProductCard } from "./ProductCard";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import replaceSizeInDescription from "../utils/utils";
import "../App.css";

export const ProductSection = () => {
  const [productData, setProductData] = useState({});
  const [groups, setGroups] = useState([]);
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts(productsList[3].id);
        const data = response.data;
        setProductData(data);
        setAdverts(data.adverts || []);
        const groupData = data?.declinationGroupsFromMFP?.groups || [];
    
        setGroups(groupData);

        if (groupData[0]?.groupKeyValue) {
          setSelectedFilter(groupData[0].groupKeyValue);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const uniqueFilters = groups.map((group) => group.groupKeyValue);

  const currentGroup = groups.find(
    (group) => group.groupKeyValue === selectedFilter
  );
  const advertIdsInGroup =
    currentGroup?.groupProducts.map((p) => p.id) || [];
  const filteredAdverts = adverts.filter(
    (advert) =>
      advertIdsInGroup.includes(advert.productId)
  );

  const selectedImageUrl = currentGroup?.imgUrl? currentGroup?.imgUrl: productData?.imagesUrls[0];
  
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
                    alt={productData?.cluster?.urlName}
                    sx={{
                      width: { xs: "70%", md: "100%" },
                      height: "auto",
                      borderRadius: 2,
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
            </Grid>

            <Grid item size={{xs:12, md:8}}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                {currentGroup?.groupProducts?.[0]?.title || ""}
              </Typography>
              <Chip
                size="small"
                color="default"
                label={productData?.globalRating?.score ? `Note : ${productData?.globalRating?.score}/5` : "Pas encore d'avis"}
                sx={{ mb: 2 }}
              />
              {uniqueFilters.length > 0 && (
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="filter-label">
                    {productData.firstSelectorInternalLabel || "Filtrer"}
                  </InputLabel>
                  <Select
                    labelId="filter-label"
                    value={selectedFilter}
                    label={productData.firstSelectorInternalLabel}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    {uniqueFilters.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {filteredAdverts.length > 0 && (
              <Grid container spacing={2}>
                {filteredAdverts.map((advert) => (
                  <Grid key={advert.advertId} item xs={12}>
                    <ProductCard product={advert} data={productData} />
                  </Grid>
                ))}
              </Grid>
              )}
              {filteredAdverts.length === 0 && (
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
                    Essayez un autre filtre ou reviens plus tard.
                </Typography>
                </Box>
              </Grid>
              )}
            </Grid>



            {productData?.productDetailTitle && (
              <Grid item xs={12}>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {productData.productDetailTitle}
                  </Typography>

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
                      dangerouslySetInnerHTML={{
                        __html: productData.edito,
                      }}
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
