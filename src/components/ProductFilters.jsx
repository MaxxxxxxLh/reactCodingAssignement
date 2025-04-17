import { FormControl, InputLabel, Select, MenuItem, Typography, Chip } from "@mui/material";

export const ProductFilters = ({
  productData,
  groups,
  selectedFilter,
  setSelectedFilter,
  currentGroup,
}) => {
  const uniqueFilters = groups.map((group) => group.groupKeyValue);

  return (
    <>
      <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
        {currentGroup?.groupProducts?.[0]?.title || ""}
      </Typography>

      <Chip
        size="small"
        color="default"
        label={
          productData?.globalRating?.score
            ? `Note : ${productData.globalRating.score}/5`
            : "Pas encore d'avis"
        }
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
    </>
  );
};
