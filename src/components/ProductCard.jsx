import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

export const ProductCard = ({ product }) => {
  const {
    salePrice,
    rspCampaignDiscount,
    shippingAmount,
    quality,
    seller,
    monthlyPayments,
    crewDetails,
  } = product;

  const cashback =
    crewDetails?.brand?.cashback?.value &&
    crewDetails.brand.cashback.type === "p"
      ? `${crewDetails.brand.cashback.value}% de cashback`
      : null;

  const hasDiscount = rspCampaignDiscount && rspCampaignDiscount > 0;

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        p: 2,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
          {hasDiscount && (
            <span style={{ textDecoration: "line-through", color: "#999", marginRight: 8 }}>
              {salePrice.toFixed(2)} €
            </span>
          )}
          <strong>{(salePrice*(1-rspCampaignDiscount/100)).toFixed(2)} €</strong>
          {hasDiscount && rspCampaignDiscount && (
            <Chip
              label={`-${rspCampaignDiscount}%`}
              color="error"
              size="small"
              sx={{ ml: 1 }}
            />
          )}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
          <Chip
            size="small"
            label={`Frais de port : ${shippingAmount?.toFixed(2)} €`}
          />
          <Chip size="small" label={`État : ${quality}`} />
          <Chip
            size="small"
            color={seller?.type === "PRO" ? "success" : "default"}
            label={`Vendu par : ${seller?.login} (${seller?.type})`}
          />
          {cashback && <Chip size="small" color="warning" label={cashback} />}
        </Stack>

        {monthlyPayments?.length > 0 && (
          <Box sx={{ mt: 1 }}>
            {monthlyPayments.map((payment, idx) => (
              <Typography
                key={idx}
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                💳 {payment.title} - {payment.description.split("\n")[0]}
              </Typography>
            ))}
          </Box>
        )}

        <Divider sx={{ mt: 2 }} />
      </Box>
    </Card>
  );
};
